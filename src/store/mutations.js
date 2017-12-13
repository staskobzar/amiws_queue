import Vue from 'vue'
import AmiServer from './class.amiserver'
import Queue from './class.queue'
import * as mtype from './mutation-types'

export default {
  [mtype.WS_CONNECTED] (state, status) {
    state.ws_connected = status
  },

  [mtype.ERROR_MSG] (state, message) {
    state.errorResponse = message
    state.showError = true
  },

  [mtype.CLEAR_AMISRV_LIST] (state) {
    state.servers.splice(0)
  },

  [mtype.CLEAR_QUEUES_LIST] (state) {
    state.queues.splice(0)
  },

  [mtype.NEW_AMI_SERVER] (state, { msg }) {
    const srv = state.servers.find(srv => srv.matchId(msg.server_id))
    if (srv) {
      srv.update(msg)
    } else {
      state.servers.push(new AmiServer(msg))
      state.selectedServers.push(msg.server_id)
    }
  },

  [mtype.ADD_QUEUE] (state, { msg }) {
    let queue = state.queues.find(q => q.match(msg))
    if (queue) {
      queue.update(msg)
    } else {
      state.queues.push(new Queue(msg))
    }
  },

  [mtype.UPDATE_QUEUE_SUMMARY] (state, { msg }) {
    const data = msg.data
    const queue = state.queues.find(q => q.match(msg))
    if (queue) {
      queue.holdtime = +data.HoldTime
      queue.talktime = +data.TalkTime
    }
  },

  [mtype.ADD_QUEUE_MEMBER] (state, { msg }) {
    const queue = state.queues.find(q => q.match(msg))
    if (queue) {
      queue.addMember(msg)
    }
  },

  [mtype.REMOVE_QUEUE_MEMBER] (state, { msg }) {
    const queue = state.queues.find(q => q.match(msg))
    if (queue) {
      queue.removeMember(msg)
    }
  },

  [mtype.UPDATE_QUEUE_MEMBER_STATUS] (state, { msg }) {
    const queue = state.queues.find(q => q.match(msg))
    if (queue) {
      queue.updateMember(msg)
    }
  },

  [mtype.QUEUE_MEMBER_CONNECTED] (state, { msg }) {
    const queue = state.queues.find(q => q.match(msg))
    if (queue) {
      msg.data.InCall = 1
      queue.updateMember(msg)
    }
  },

  [mtype.QUEUE_MEMBER_COMPLETE] (state, { msg }) {
    const queue = state.queues.find(q => q.match(msg))
    if (queue) {
      msg.data.InCall = 0
      queue.completed++
      queue.updateMember(msg)
    }
  },

  [mtype.UPDATE_QUEUE_MEMBER_PAUSE] (state, { msg }) {
    const queue = state.queues.find(q => q.match(msg))
    if (queue) {
      queue.updateMember(msg)
    }
  },

  [mtype.QUEUE_REMOVE_MEMBER] (state, { queue, memberInf, sid }) {
    Vue.websockSend(JSON.stringify({
      Action: 'QueueRemove',
      Interface: memberInf,
      Queue: queue,
      AMIServerID: sid
    }))
  },

  [mtype.PAUSE_QUEUE_MEMBER] (state, { queue, memberInf, sid, pause }) {
    Vue.websockSend(JSON.stringify({
      Action: 'QueuePause',
      Interface: memberInf,
      Paused: pause ? 'true' : 'false',
      Queue: queue,
      AMIServerID: sid
    }))
  },

  [mtype.QUEUE_ADD_MEMBER] (state, { queue, member }) {
    Vue.websockSend(JSON.stringify({
      Action: 'QueueAdd',
      AMIServerID: queue.sid,
      Queue: queue.name,
      Interface: member.interface,
      Penalty: member.penalty,
      Paused: member.paused,
      MemberName: member.name
    }))
  },

  [mtype.ADD_QUEUE_CALLER] (state, { msg }) {
    const queue = state.queues.find(q => q.match(msg))
    if (queue) {
      queue.addCaller(msg)
    }
  },

  [mtype.LEAVE_QUEUE_CALLER] (state, { msg }) {
    const queue = state.queues.find(q => q.match(msg))
    if (queue) {
      queue.callerLeavesQueue(msg)
    }
  },

  [mtype.ABANDON_QUEUE_CALLER] (state, { msg }) {
    const queue = state.queues.find(q => q.match(msg))
    if (queue) {
      queue.abandoned++
    }
  },

  [mtype.SET_SELECTED_QUEUE] (state, { queueName }) {
    state.selectedQueue = queueName
  }
}
