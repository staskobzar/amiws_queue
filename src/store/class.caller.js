import * as cstate from './caller-state'

export default class {
  position = null
  status = null
  chan = null
  uid = null
  clidNum = null
  clidName = null
  lineNum = null
  lineName = null
  wait = 0
  incall = false
  _waitInterval = null
  answerTime = 0

  constructor (msg) {
    const data = msg.data
    this.position = +data.Position
    this.status = data.Event === 'Join' ? cstate.JOINED : cstate.ANSWERED
    this.chan = data.Channel
    this.uid = data.Uniqueid
    this.clidNum = data.CallerIDNum
    this.clidName = data.CallerIDName
    this.lineNum = data.ConnectedLineNum
    this.lineName = data.ConnectedLineName
    if (data.Wait) this.wait = +data.Wait
    this._waitInterval = setInterval(() => this.wait++, 1000)
  }
}
