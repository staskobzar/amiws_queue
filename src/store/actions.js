import * as mtype from './mutation-types'

export default {
  newMessage ({ commit }, rawMsg) {
    const msg = JSON.parse(rawMsg)
    // Response
    if (msg.type === 4) {
      // AMI server CoreStatus response
      if (msg.data.CoreStartupDate) {
        // create or update server
        commit(mtype.NEW_AMI_SERVER, { msg })
      } else if (msg.data.EventList && msg.data.EventList === 'start') {
        commit(mtype.LOADING_QUEUES, 1)
      }
    } else if (msg.type === 3) {
      // event
      if (msg.data.Event === 'QueueParams') {
        commit(mtype.ADD_QUEUE, { msg })
      // members
      } else if (msg.data.Event === 'QueueMember') {
        commit(mtype.ADD_QUEUE_MEMBER, { msg })
      } else if (msg.data.Event === 'QueueMemberAdded') {
        commit(mtype.ADD_QUEUE_MEMBER, { msg })
      } else if (msg.data.Event === 'QueueMemberRemoved') {
        commit(mtype.REMOVE_QUEUE_MEMBER, { msg })
      // callers
      } else if (msg.data.Event === 'QueueEntry') {
        commit(mtype.ADD_QUEUE_CALLER, { msg })
      } else if (msg.data.Event === 'Join') {
        commit(mtype.ADD_QUEUE_CALLER, { msg })
      } else if (msg.data.Event === 'QueueCallerJoin') {
        commit(mtype.ADD_QUEUE_CALLER, { msg })
      } else if (msg.data.Event === 'Leave') {
        commit(mtype.UPDATE_QUEUE_CALLER, { msg })
      } else if (msg.data.Event === 'Hangup') {
        commit(mtype.HANGUP_QUEUE_CALLER, { msg })
      } else if (msg.data.Event === 'SoftHangupRequest') {
        commit(mtype.HANGUP_QUEUE_CALLER, { msg })
      } else if (msg.data.Event === 'QueueCallerAbandon') {
        commit(mtype.ABANDON_QUEUE_CALLER, { msg })
      } else if (msg.data.Event === 'QueueSummary') {
        commit(mtype.UPDATE_QUEUE_SUMMARY, { msg })
      } else if (msg.data.Event === 'QueueMemberPause') {
        commit(mtype.UPDATE_QUEUE_MEMBER_PAUSE, { msg })
      } else if (msg.data.Event === 'QueueMemberPaused') {
        commit(mtype.UPDATE_QUEUE_MEMBER_PAUSE, { msg })
      } else if (msg.data.Event === 'QueueMemberStatus') {
        commit(mtype.UPDATE_QUEUE_MEMBER_STATUS, { msg })
      } else if (msg.data.Event === 'AgentConnect') {
        commit(mtype.QUEUE_MEMBER_CONNECTED, { msg })
      } else if (msg.data.Event === 'AgentComplete') {
        commit(mtype.QUEUE_MEMBER_COMPLETE, { msg })
      } else if (msg.data.Event === 'QueueStatusComplete') {
        commit(mtype.LOADING_QUEUES, -1)
      }
    }
  },
  selectedQueue ({ commit }, queueName) {
    commit(mtype.SET_SELECTED_QUEUE, { queueName })
  },
  pauseAllAgents ({ commit, state }, {name, sid, pause}) {
    const queue = state.queues.find(q => q.sid === sid && q.name === name)
    if (queue) {
      queue.members.forEach(m => {
        commit(mtype.PAUSE_QUEUE_MEMBER, { queue: queue.name, memberInf: m.interface, sid: queue.sid, pause: pause })
      })
    }
  },
  pauseAgentInSelectedQueue ({ commit, state }, {member, pause}) {
    const queue = state.queues.find(q => q.name === state.selectedQueue)
    if (queue) {
      commit(mtype.PAUSE_QUEUE_MEMBER, { queue: queue.name, memberInf: member.interface, sid: queue.sid, pause: pause })
    }
  },
  setQueuesFilter ({ commit, state }, filter) {
    state.qnameFilter = filter
  },
  setPerPage ({ commit, state }, perPage) {
    state.pagination.perPage = perPage
  },
  setCurPage ({ commit, state }, page) {
    state.pagination.currentPage = page
  }
}
