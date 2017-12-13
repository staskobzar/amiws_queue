export default class {
  name = null
  interface = null
  membership = null
  penalty = 0
  callsTaken = 0
  lastCall = null
  status = null
  ringing = false
  paused = false
  pausedReason = null
  lastHoldtime = 0
  lastTalktime = 0
  incall = false
  incallTime = 0
  chan = null
  callerNum = null
  callerName = null
  _incallInterval = null

  constructor (msg) {
    const data = msg.data
    this.name = data.Name || data.MemberName
    this.interface = data.StateInterface || data.Location
    this.membership = data.Membership
    this.penalty = +data.Penalty
    this.callsTaken = +data.CallsTaken
    this.lastCall = data.LastCall
    this.status = +data.Status
    this.incall = (+data.InCall) === 1
    this.paused = (+data.Paused) === 1
    this.pausedReason = data.PausedReason
  }

  _setMemberInCall (isInCall) {
    if (!this._incallInterval && isInCall) {
      this._incallInterval = setInterval(() => this.incallTime++, 1000)
    }
    if (this._incallInterval && this.incall && !isInCall) {
      clearInterval(this._incallInterval)
      this.incallTime = 0
      this.chan = null
      this._incallInterval = null
      this.callerNum = null
      this.callerName = null
    }
    this.incall = isInCall
  }

  update (data) {
    if (data.Name) this.name = data.Name
    if (data.MemberName) this.name = data.MemberName
    if (data.Location) this.interface = data.Location
    if (data.StateInterface) this.interface = data.StateInterface
    if (data.Membership) this.membership = data.Membership
    if (data.Penalty) this.penalty = +data.Penalty
    if (data.CallsTaken) this.callsTaken = +data.CallsTaken
    if (data.LastCall) this.lastCall = +data.LastCall
    if (data.Status) this.status = +data.Status
    if (data.Paused) this.paused = (+data.Paused) === 1
    if (data.PausedReason) this.pausedReason = data.PausedReason
    if (data.HoldTime) this.lastHoldtime = +data.HoldTime
    if (data.TalkTime) this.lastTalktime = +data.TalkTime
    if (data.Channel && data.Event !== 'AgentConnect') this.chan = data.Channel

    if (data.ChannelCalling) this.chan = data.ChannelCalling
    if (data.InCall !== undefined) this._setMemberInCall((+data.InCall) === 1)

    this.ringing = this.status === 2
    if (data.Event === 'AgentRingNoAnswer') {
      this.ringing = false
      this.chan = null
      this._setMemberInCall(false)
    }
    if (data.Event === 'AgentCalled' && !this.incall) {
      this.ringing = true
      this.callerNum = data.CallerIDNum
      this.callerName = data.CallerIDName
    }
  }

  match (name) {
    return this.name === name
  }
}
