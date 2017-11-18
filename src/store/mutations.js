import Vue from 'vue'
import * as mtype from './mutation-types'
import * as cstate from './caller-state'

export default {
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
      member.penalty = +data.Penalty
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
      member.penalty = +data.Penalty
      member.callsTaken = +data.CallsTaken
      member.lastCall = data.LastCall
      member.incall = (+data.InCall) === 1
      member.status = +data.Status
      member.paused = (+data.Paused) === 1
      member.pausedReason = data.PausedReason
      member.lastHoldtime = 0
      member.lastTalktime = 0
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

  [mtype.UPDATE_QUEUE_MEMBER_STATUS] (state, { msg }) {
    const data = msg.data
    const queue = state.queues.find(q => q.name === data.Queue && q.sid === msg.server_id)
    if (!queue) {
      return false // no queue found
    }
    const idx = queue.members.findIndex(m => m.name === data.MemberName && m.interface === data.StateInterface)
    if (idx !== -1) {
      queue.members[idx].paused = +(data.Paused) === 1
      queue.members[idx].status = +(data.Status)
      queue.members[idx].callsTaken = +(data.CallsTaken)
      queue.members[idx].lastCall = +(data.LastCall)
      queue.members[idx].penalty = +(data.Penalty)
    }
  },

  [mtype.QUEUE_MEMBER_CONNECTED] (state, { msg }) {
    const data = msg.data
    const queue = state.queues.find(q => q.name === data.Queue && q.sid === msg.server_id)
    if (!queue) {
      return false // no queue found
    }
    const idx = queue.members.findIndex(m => m.name === data.MemberName && m.interface === data.Member)
    if (idx !== -1) {
      queue.members[idx].lastHoldtime = +(data.HoldTime)
      queue.members[idx].incall = true
    }
  },

  [mtype.QUEUE_MEMBER_COMPLETE] (state, { msg }) {
    const data = msg.data
    const queue = state.queues.find(q => q.name === data.Queue && q.sid === msg.server_id)
    if (!queue) {
      return false // no queue found
    }
    const idx = queue.members.findIndex(m => m.name === data.MemberName && m.interface === data.Member)
    if (idx !== -1) {
      queue.members[idx].lastHoldtime = +(data.HoldTime)
      queue.members[idx].lastTalktime = +(data.TalkTime)
      queue.members[idx].incall = false
    }
  },

  [mtype.UPDATE_QUEUE_MEMBER_PAUSE] (state, { msg }) {
    const data = msg.data
    const queue = state.queues.find(q => q.name === data.Queue && q.sid === msg.server_id)
    let i = -1
    if (!queue) {
      return false // no queue found
    }
    if ((i = queue.members.findIndex(m => (m.interface === data.StateInterface || m.location === data.Location))) !== -1) {
      queue.members[i].paused = data.Paused === '1'
    }
  },

  [mtype.PAUSE_QUEUE_MEMBER] (state, { queue, memberInf, sid, pause }) {
    Vue.websockSend(JSON.stringify({
      Action: 'QueuePause',
      Interface: memberInf,
      Paused: pause ? 'true' : 'false',
      Queue: queue
    }))
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
      Vue.websockSend(JSON.stringify({Action: 'QueueSummary', Queue: queue.name}))
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
