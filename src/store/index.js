import Vue from 'vue'
import Vuex from 'vuex'

import * as mtype from './mutation-types'
// caller state
import * as cstate from './caller-state'

Vue.use(Vuex)

const state = {
  servers: [],
  queues: [],
  selectedQueue: '',
  pagination: {
    perPage: 10,
    currentPage: 1
  }
}

const mutations = {
  [mtype.CLEAR_AMISRV_LIST] (state) {
    state.servers.splice(0)
  },

  [mtype.CLEAR_QUEUES_LIST] (state) {
    state.queues.splice(0)
  },

  [mtype.NEW_AMI_SERVER] (state, { msg }) {
    const data = msg.data
    const reloaded = new Date(`${data.CoreReloadDate} ${data.CoreReloadTime}`)
    const started = new Date(`${data.CoreStartupDate} ${data.CoreStartupTime}`)
    const srv = state.servers.find(srv => srv.id === msg.server_id) || {}
    if (srv.id) {
      srv.reloaded = reloaded
      srv.started = started
    } else {
      srv.id = msg.server_id
      srv.name = msg.server_name
      srv.ssl = msg.ssl
      srv.reloaded = reloaded
      srv.started = started
      srv.queuesNum = 0
      state.servers.push(srv)
    }
  },

  [mtype.ADD_QUEUE] (state, { msg }) {
    const srv = state.servers.find(s => s.id === msg.server_id)
    const data = msg.data
    let queue = state.queues.find(q => q.name === data.Queue)
    if (srv) {
      if (queue) {
        queue.holdtime = +data.Holdtime
        queue.talktime = +data.TalkTime
        queue.completed = +data.Completed
        queue.adandoned = +data.Abandoned
        queue.SL = +data.ServiceLevel
        queue.SLPerf = +data.ServicelevelPerf
        queue.weight = +data.Weight
      } else {
        queue = {}
        queue.sid = msg.server_id
        queue.name = data.Queue
        queue.max = +data.Max
        queue.strategy = data.Strategy
        queue.holdtime = +data.Holdtime
        queue.talktime = +data.TalkTime
        queue.completed = +data.Completed
        queue.abandoned = +data.Abandoned
        queue.SL = +data.ServiceLevel
        queue.SLPerf = +data.ServicelevelPerf
        queue.weight = +data.Weight
        queue.members = []
        queue.callers = []
        state.queues.push(queue)
      }
    }
  },

  [mtype.UPDATE_QUEUE_SUMMARY] (state, { msg }) {
    const data = msg.data
    const queue = state.queues.find(q => q.name === data.Queue && q.sid === msg.server_id)
    if (queue) {
      queue.holdtime = +data.HoldTime
      queue.talktime = +data.TalkTime
    }
  },

  [mtype.ADD_QUEUE_MEMBER] (state, { msg }) {
    const data = msg.data
    const queue = state.queues.find(q => q.name === data.Queue && q.sid === msg.server_id)
    if (!queue) {
      return false // no queue found
    }
    let member = queue.members.find(m => m.name === data.Name)
    if (member) {
      member.location = data.Location
      member.interface = data.StateInterface
      member.membership = data.Membership
      member.penalty = data.Penalty
      member.callsTaken = +data.CallsTaken
      member.lastCall = data.LastCall
      member.incall = (+data.InCall) === 1
      member.status = +data.Status
      member.paused = (+data.Paused) === 1
      member.pausedReason = data.PausedReason
    } else {
      member = {}
      member.name = data.Name || data.MemberName
      member.location = data.Location
      member.interface = data.StateInterface
      member.membership = data.Membership
      member.penalty = data.Penalty
      member.callsTaken = +data.CallsTaken
      member.lastCall = data.LastCall
      member.incall = (+data.InCall) === 1
      member.status = +data.Status
      member.paused = (+data.Paused) === 1
      member.pausedReason = data.PausedReason
      queue.members.push(member)
    }
  },

  [mtype.REMOVE_QUEUE_MEMBER] (state, { msg }) {
    const data = msg.data
    const queue = state.queues.find(q => q.name === data.Queue && q.sid === msg.server_id)
    if (!queue) {
      return false // no queue found
    }
    const idx = queue.members.findIndex(m => m.name === data.MemberName && m.interface === data.StateInterface)
    if (idx !== -1) {
      queue.members.splice(idx, 1)
    }
  },

  [mtype.UPDATE_QUEUE_MEMBER_PAUSE] (state, { msg }) {
    const data = msg.data
    const queue = state.queues.find(q => q.name === data.Queue && q.sid === msg.server_id)
    let i = -1
    if (!queue) {
      return false // no queue found
    }
    if ((i = queue.members.findIndex(m => m.interface === data.StateInterface)) !== -1) {
      queue.members[i].paused = data.Paused === '1'
    }
  },

  [mtype.PAUSE_QUEUE_MEMBER] (state, { queue, memberInf, sid, pause }) {
    if (process.env.NODE_ENV !== 'testing') {
      Vue.websockSend(JSON.stringify({
        Action: 'QueuePause',
        Interface: memberInf,
        Paused: pause ? 'true' : 'false',
        Queue: queue
      }))
    }
  },

  [mtype.ADD_QUEUE_CALLER] (state, { msg }) {
    const data = msg.data
    const queue = state.queues.find(q => q.name === data.Queue && q.sid === msg.server_id)
    if (!queue) {
      return false // no queue found
    }
    const caller = {
      position: +data.Position,
      status: data.Event === 'Join' ? cstate.JOINED : cstate.ANSWERED,
      chan: data.Channel,
      uid: data.Uniqueid,
      clidNum: data.CallerIDNum,
      clidName: data.CallerIDName,
      lineNum: data.ConnectedLineNum,
      lineName: data.ConnectedLineName,
      wait: +data.Wait
    }
    queue.callers.push(caller)
  },

  [mtype.UPDATE_QUEUE_CALLER] (state, { msg }) {
    const data = msg.data
    const queue = state.queues.find(q => q.name === data.Queue && q.sid === msg.server_id)
    let i = -1
    if (!queue) {
      return false // no queue found
    }
    if (data.Event === 'Leave') {
      if ((i = queue.callers.findIndex(c => c.chan === data.Channel && c.uid === data.Uniqueid)) !== -1) {
        queue.callers[i].status = cstate.ANSWERED
      }
    }
  },

  [mtype.HANGUP_QUEUE_CALLER] (state, { msg }) {
    const data = msg.data
    const queue = state.queues.find(q => q.sid === msg.server_id &&
      q.callers.find(c => c.chan === data.Channel && c.uid === data.Uniqueid))
    if (!queue) {
      return false // no queue found
    }
    const idx = queue.callers.findIndex(c => c.chan === data.Channel && c.uid === data.Uniqueid)
    if (idx !== -1) {
      queue.callers.splice(idx, 1)
      queue.completed++
      if (process.env.NODE_ENV !== 'testing') {
        Vue.websockSend(JSON.stringify({Action: 'QueueSummary', Queue: queue.name}))
      }
    }
  },

  [mtype.ABANDON_QUEUE_CALLER] (state, { msg }) {
    const data = msg.data
    const queue = state.queues.find(q => q.name === data.Queue)
    if (!queue) {
      return false // no queue found
    }
    queue.completed--
    queue.abandoned++
  },

  [mtype.SET_SELECTED_QUEUE] (state, { queueName }) {
    state.selectedQueue = queueName
  }
}

const actions = {
  newMessage ({ commit }, rawMsg) {
    const msg = JSON.parse(rawMsg)
    // Response
    if (msg.type === 4) {
      // AMI server CoreStatus response
      if (msg.data.CoreStartupDate) {
        // create or update server
        commit(mtype.NEW_AMI_SERVER, { msg })
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
  setPerPage ({ commit, state }, perPage) {
    state.pagination.perPage = perPage
  },
  setCurPage ({ commit, state }, page) {
    state.pagination.currentPage = page
  }
}

const getters = {
  getAmiServers: state => state.servers,
  getQueues: state => state.queues,
  getQueuesPerServer: (state, getters) => (sid) => {
    return state.queues.filter(q => q.sid === sid).length
  },
  getTotalActiveCalls: state => {
    return state.queues.map(e => e.callers.filter(m => m.status === cstate.ANSWERED).length)
      .reduce((t, m) => t + m, 0)
  },
  getTotalWaitingCalls: state => {
    return state.queues.map(e => e.callers.filter(m => m.status === cstate.JOINED).length)
      .reduce((t, m) => t + m, 0)
  },
  getTotalCompletedCalls: state => state.queues.reduce((t, q) => t + q.completed, 0),
  getTotalAbandonedCalls: state => state.queues.reduce((t, q) => t + q.abandoned, 0),
  getTotalPausedMembers: state => {
    return state.queues.map(e => e.members.filter(m => m.paused).length)
      .reduce((t, m) => t + m, 0)
  },
  getTotalUnpausedMembers: state => {
    return state.queues.map(e => e.members.filter(m => !m.paused).length)
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
      return queue.callers
    }
  },
  getSelectedQueue: state => state.selectedQueue,

  getPerPage: state => state.pagination.perPage,
  getCurPage: state => state.pagination.currentPage
}

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters
})
