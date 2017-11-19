export default class {
  id = null
  name = null
  ssl = false
  reloaded = null
  started = null

  constructor (msg) {
    this.id = msg.server_id
    this.name = msg.server_name
    this.ssl = msg.ssl
    this.reloaded = this._reloadedDate(msg.data)
    this.started = this._startedDate(msg.data)
  }

  matchId (id) {
    return id === this.id
  }

  update (msg) {
    this.reloaded = this._reloadedDate(msg.data)
    this.started = this._startedDate(msg.data)
  }

  _reloadedDate (data) {
    return new Date(`${data.CoreReloadDate} ${data.CoreReloadTime}`)
  }

  _startedDate (data) {
    return new Date(`${data.CoreStartupDate} ${data.CoreStartupTime}`)
  }
}
