import Vue from 'vue'
import Vuex from 'vuex'

import * as mtype from './mutation-types'

Vue.use(Vuex)

const state = {
  servers: [],
  queues: []
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
        queue.calls = +data.Calls
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
        queue.calls = +data.Calls
        queue.holdtime = +data.Holdtime
        queue.talktime = +data.TalkTime
        queue.completed = +data.Completed
        queue.abandoned = +data.Abandoned
        queue.SL = +data.ServiceLevel
        queue.SLPerf = +data.ServicelevelPerf
        queue.weight = +data.Weight
        queue.members = []
        state.queues.push(queue)
      }
    }
  },

  [mtype.ADD_QUEUE_MEMBER] (state, { msg }) {
    const data = msg.data
    const queue = state.queues.find(q => q.name === data.Queue)
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
      member.name = data.Name
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
      } else if (msg.data.Event === 'QueueMember') {
        commit(mtype.ADD_QUEUE_MEMBER, { msg })
      }
    }
  }
}

const getters = {
  getAmiServers: state => state.servers,
  getQueues: state => state.queues,
  getQueuesPerServer: (state, getters) => (sid) => {
    return state.queues.filter(q => q.sid === sid).length
  },
  getTotalActiveCalls: state => state.queues.reduce((t, q) => t + q.calls, 0),
  getTotalCompletedCalls: state => state.queues.reduce((t, q) => t + q.completed, 0),
  getTotalAbandonedCalls: state => state.queues.reduce((t, q) => t + q.abandoned, 0),
  getTotalServiceLevel: state => state.queues.reduce((t, q) => t + q.SL, 0.0),
  getTotalPausedMembers: state => {
    return state.queues.map(e => e.members.filter(m => m.paused).length)
      .reduce((t, m) => t + m, 0)
  },
  getTotalUnpausedMembers: state => {
    return state.queues.map(e => e.members.filter(m => !m.paused).length)
      .reduce((t, m) => t + m, 0)
  }
}

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters
})
