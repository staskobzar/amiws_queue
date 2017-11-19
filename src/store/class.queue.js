import Member from './class.member'
import Caller from './class.caller'

export default class {
  sid = null
  name = null
  max = 0
  strategy = null
  holdtime = 0
  talktime = 0
  completed = 0
  abandoned = 0
  SL = null
  SLPerf = null
  weight = 0
  members = []
  callers = []

  constructor (msg) {
    const data = msg.data
    this.sid = msg.server_id
    this.name = data.Queue
    this.max = +data.Max
    this.strategy = data.Strategy
    this.holdtime = +data.Holdtime
    this.talktime = +data.TalkTime
    this.completed = +data.Completed
    this.abandoned = +data.Abandoned
    this.SL = +data.ServiceLevel
    this.SLPerf = +data.ServicelevelPerf
    this.weight = +data.Weight
  }

  update (msg) {
    const data = msg.data
    this.holdtime = +data.Holdtime
    this.talktime = +data.TalkTime
    this.completed = +data.Completed
    this.adandoned = +data.Abandoned
    this.SL = +data.ServiceLevel
    this.SLPerf = +data.ServicelevelPerf
    this.weight = +data.Weight
  }

  match (msg) {
    return (msg.server_id === this.sid && msg.data.Queue === this.name)
  }

  findMember (name) {
    return this.members.find(m => m.name === name)
  }

  _memberIndex (data) {
    const index = this.members.findIndex(m => m.name === data.MemberName && m.interface === data.StateInterface)
    return index === -1 ? null : index
  }

  removeMember (msg) {
    const idx = this._memberIndex(msg.data)
    if (idx !== null) {
      this.members.splice(idx, 1)
    }
  }

  addMember (msg) {
    const member = this.findMember(msg.data.Name)
    if (member) {
      member.update(msg.data)
    } else {
      this.members.push(new Member(msg))
    }
  }

  updateMember (msg) {
    const member = this.findMember(msg.data.MemberName)
    if (member) {
      member.update(msg.data)
    }
  }

  findCaller (data) {
    return this.callers.find(c => c.chan === data.Channel && c.uid === data.Uniqueid)
  }

  addCaller (msg) {
    this.callers.push(new Caller(msg))
  }

/*
  updateCaller (msg) {
    const caller = this.findCaller(msg.data)
    if (caller) {
      caller.update(msg.data)
    }
  }
*/
  callerAnswered (msg) {
    const data = msg.data
    const caller = this.findCaller(data)
    if (caller && data.Event === 'Leave') {
      caller.setAnswered()
    }
  }

  removeCaller (msg) {
    const data = msg.data
    const idx = this.callers.findIndex(c => c.chan === data.Channel && c.uid === data.Uniqueid)
    if (idx !== -1) {
      this.callers.splice(idx, 1)
      this.completed++
    }
  }
}
