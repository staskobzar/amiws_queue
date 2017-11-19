export default class {
  name = null
  location = null
  interface = null
  membership = null
  penalty = 0
  callsTaken = 0
  lastCall = null
  incall = false
  status = null
  paused = false
  pausedReason = null
  lastHoldtime = 0
  lastTalktime = 0

  constructor (msg) {
    const data = msg.data
    this.name = data.Name || data.MemberName
    this.location = data.Location
    this.interface = data.StateInterface
    this.membership = data.Membership
    this.penalty = +data.Penalty
    this.callsTaken = +data.CallsTaken
    this.lastCall = data.LastCall
    this.incall = (+data.InCall) === 1
    this.status = +data.Status
    this.paused = (+data.Paused) === 1
    this.pausedReason = data.PausedReason
  }

  update (data) {
    if (data.Name) this.name = data.Name
    if (data.MemberName) this.name = data.MemberName
    if (data.Location) this.location = data.Location
    if (data.StateInterface) this.interface = data.StateInterface
    if (data.Membership) this.membership = data.Membership
    if (data.Penalty) this.penalty = +data.Penalty
    if (data.CallsTaken) this.callsTaken = +data.CallsTaken
    if (data.LastCall) this.lastCall = +data.LastCall
    if (data.InCall) this.incall = (+data.InCall) === 1
    if (data.Status) this.status = +data.Status
    if (data.Paused) this.paused = (+data.Paused) === 1
    if (data.PausedReason) this.pausedReason = data.PausedReason
    if (data.HoldTime) this.lastHoldtime = +data.HoldTime
    if (data.TalkTime) this.lastTalktime = +data.TalkTime
  }

  match (name) {
    return this.name === name
  }
}
