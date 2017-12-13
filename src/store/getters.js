export default {
  wsDisconnected: state => !state.ws_connected,
  showError: state => state.showError,
  getErrorResponse: state => state.errorResponse,
  getDragMember: state => state.dragMember,
  getAmiServers: state => state.servers,
  getAllQueues: state => state.queues,
  getSelectedServers: state => state.selectedServers,
  getQueueServerName: (state, getters) => (queue) => {
    return state.servers.find(s => s.id === queue.sid).name
  },
  getQueuesFiltered: state => {
    const filter = state.qnameFilter.toLowerCase()
    const queues = state.queues.filter(q => state.selectedServers.includes(q.sid))
    if (filter) {
      const re = new RegExp(filter, 'i')
      return queues.filter(q => q.name.match(re))
    } else {
      return queues
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
    return getters.getQueuesFiltered.map(e => e.members.filter(m => m.incall).length)
      .reduce((t, m) => t + m, 0)
  },
  getTotalWaitingCalls: (state, getters) => {
    return getters.getQueuesFiltered.map(e => e.callers.length)
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
