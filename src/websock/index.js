import print from '../logger'

const WS = {}
WS.sock = null
WS.store = null

WS.install = function (Vue, store) {
  print.info(`Connecting to ${process.env.WS_URL}`)
  this.sock = new WebSocket(process.env.WS_URL)
  this.store = store

  this.sock.onopen = () => {
    this.sock.send(JSON.stringify({ Action: 'CoreStatus' }))
    this.sock.send(JSON.stringify({ Action: 'QueueStatus' }))
  }

  this.sock.onmessage = (ev) => {
    // print.log(ev.data)
    this.store.commit('FOO', ev.data)
  }

// public method
  Vue.wsBar = () => {
  }

// instance methods
  Vue.prototype.$wsSend = function (msg) {
  }
}

export default WS
