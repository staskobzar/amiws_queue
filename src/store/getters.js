import * as cstate from './caller-state'

export default {
  wsDisconnected: state => !state.ws_connected,
  getDragMember: state => state.dragMember,
  getLoading: state => state.loading,
  getAmiServers: state => state.servers,
  getAllQueues: state => state.queues,
  getQueuesFiltered: state => {
    const filter = state.qnameFilter.toLowerCase()
    if (filter) {
      const re = new RegExp(filter, 'i')
      return state.queues.filter(q => q.name.match(re))
    } else {
      return state.queues
    }
  },
  getQueues: (state, getters) => {
    const per = state.pagination.perPage
    const page = state.pagination.currentPage
    return getters.getQueuesFiltered.slice((page - 1) * per, // begin
                                            page * per)      // end
  },
  getQueuesPerServer: (state, getters) => (sid) => {
    return state.queues.filter(q => q.sid === sid).length
  },
  getTotalActiveCalls: (state, getters) => {
    return getters.getQueuesFiltered.map(e => e.callers.filter(m => m.status === cstate.ANSWERED).length)
      .reduce((t, m) => t + m, 0)
  },
  getTotalWaitingCalls: (state, getters) => {
    return getters.getQueuesFiltered.map(e => e.callers.filter(m => m.status === cstate.JOINED).length)
      .reduce((t, m) => t + m, 0)
  },
  getTotalCompletedCalls: (state, getters) => {
    return getters.getQueuesFiltered.reduce((t, q) => t + q.completed, 0)
  },
  getTotalAbandonedCalls: (state, getters) => {
    return getters.getQueuesFiltered.reduce((t, q) => t + q.abandoned, 0)
  },
  getTotalPausedMembers: (state, getters) => {
    return getters.getQueuesFiltered.map(e => e.members.filter(m => m.paused).length)
      .reduce((t, m) => t + m, 0)
  },
  getTotalUnpausedMembers: (state, getters) => {
    return getters.getQueuesFiltered.map(e => e.members.filter(m => !m.paused).length)
      .reduce((t, m) => t + m, 0)
  },
  getSelectedMembers: state => {
    const queue = state.queues.find(q => q.name === state.selectedQueue)
    if (queue) {
      return queue.members
    }
  },
  getSelectedCallers: state => {
    const queue = state.queues.find(q => q.name === state.selectedQueue)
    if (queue) {
      return queue.callers.sort((c1, c2) => c1.position > c2.position)
    }
  },
  getSelectedQueue: state => state.selectedQueue,

  getQnameFilter: state => state.qnameFilter,
  getPerPage: state => state.pagination.perPage,
  getCurPage: state => state.pagination.currentPage
}
