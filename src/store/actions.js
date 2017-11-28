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
      switch (msg.data.Event) {
        case 'QueueParams':
          commit(mtype.ADD_QUEUE, { msg })
          break
        case 'QueueMember':
        case 'QueueMemberAdded':
          commit(mtype.ADD_QUEUE_MEMBER, { msg })
          break
        case 'QueueMemberRemoved':
          commit(mtype.REMOVE_QUEUE_MEMBER, { msg })
          break
        case 'QueueEntry':
        case 'Join':
        case 'QueueCallerJoin':
          commit(mtype.ADD_QUEUE_CALLER, { msg })
          break
        case 'QueueCallerLeave':
        case 'Leave':
          commit(mtype.UPDATE_QUEUE_CALLER, { msg })
          break
        case 'Hangup':
        case 'SoftHangupRequest':
          commit(mtype.HANGUP_QUEUE_CALLER, { msg })
          break
        case 'QueueCallerAbandon':
          commit(mtype.ABANDON_QUEUE_CALLER, { msg })
          break
        case 'QueueSummary':
          commit(mtype.UPDATE_QUEUE_SUMMARY, { msg })
          break
        case 'QueueMemberPause':
        case 'QueueMemberPaused':
          commit(mtype.UPDATE_QUEUE_MEMBER_PAUSE, { msg })
          break
        case 'QueueMemberStatus':
          commit(mtype.UPDATE_QUEUE_MEMBER_STATUS, { msg })
          break
        case 'AgentConnect':
          commit(mtype.QUEUE_MEMBER_CONNECTED, { msg })
          break
        case 'AgentComplete':
          commit(mtype.QUEUE_MEMBER_COMPLETE, { msg })
          break
        case 'QueueStatusComplete':
          commit(mtype.LOADING_QUEUES, -1)
          break
        default:
          if (process.env.NODE_ENV === 'development') {
            // console.info(`Unknown Event: ${msg.data.Event}`)
          }
          break
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
  },
  memberDragStart ({ commit, state }, member) {
    state.dragMember = member
  },
  memberDragStop ({ commit, state }) {
    state.dragMember = null
  },
  addQueueMember ({ commit, state }, { queue, member }) {
    commit(mtype.QUEUE_ADD_MEMBER, { queue, member })
  }
}
