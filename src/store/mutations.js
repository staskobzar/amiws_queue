import Vue from 'vue'
import AmiServer from './class.amiserver'
import Queue from './class.queue'
import * as mtype from './mutation-types'

export default {
  [mtype.WS_CONNECTED] (state, status) {
    state.ws_connected = status
  },

  [mtype.LOADING_QUEUES] (state, inc) {
    state.loading += inc
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
      queue.updateMember(msg)
    }
  },

  [mtype.UPDATE_QUEUE_MEMBER_PAUSE] (state, { msg }) {
    const queue = state.queues.find(q => q.match(msg))
    if (queue) {
      queue.updateMember(msg)
    }
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

  [mtype.ADD_QUEUE_CALLER] (state, { msg }) {
    const queue = state.queues.find(q => q.match(msg))
    if (queue) {
      queue.addCaller(msg)
    }
  },

  [mtype.UPDATE_QUEUE_CALLER] (state, { msg }) {
    const queue = state.queues.find(q => q.match(msg))
    if (queue) {
      queue.callerAnswered(msg)
    }
  },

  [mtype.HANGUP_QUEUE_CALLER] (state, { msg }) {
    const data = msg.data
    const queue = state.queues.find(q => q.sid === msg.server_id &&
      q.callers.find(c => c.chan === data.Channel && c.uid === data.Uniqueid))
    if (queue) {
      queue.removeCaller(msg)
      Vue.websockSend(JSON.stringify({Action: 'QueueSummary', Queue: queue.name}))
    }
  },

  [mtype.ABANDON_QUEUE_CALLER] (state, { msg }) {
    const queue = state.queues.find(q => q.match(msg))
    if (queue) {
      queue.completed--
      queue.abandoned++
    }
  },

  [mtype.SET_SELECTED_QUEUE] (state, { queueName }) {
    state.selectedQueue = queueName
    if (queueName.length > 0) {
      state.pagination.perPage--
    } else {
      state.pagination.perPage++
    }
  }
}
