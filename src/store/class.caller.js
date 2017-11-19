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
  wait = null

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
    this.wait = +data.Wait
  }

/*
  update (data) {
    if (data.Position) this.position = +data.Position
    if (data.Event) this.status = data.Event === 'Join' ? cstate.JOINED : cstate.ANSWERED
    if (data.Channel) this.chan = data.Channel
    if (data.Uniqueid) this.uid = data.Uniqueid
    if (data.CallerIDNum) this.clidNum = data.CallerIDNum
    if (data.CallerIDName) this.clidName = data.CallerIDName
    if (data.ConnectedLineNum) this.lineNum = data.ConnectedLineNum
    if (data.ConnectedLineName) this.lineName = data.ConnectedLineName
    if (data.Wait) this.wait = +data.Wait
  }
*/

  setAnswered () {
    this.status = cstate.ANSWERED
  }
}
