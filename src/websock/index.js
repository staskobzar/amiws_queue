const WS = {}
WS.sock = null
WS.store = null

WS.install = function (Vue, store) {
  this.sock = new WebSocket(process.env.WS_URL)
  this.store = store

  this.sock.onopen = () => {
    /*
     * We need Action: Queue here because it helps to load realtime
     * queues. Otherwise, Asterisk will not get realtime queues after
     * restart with Action: QueueStatus only.
     */
    this.sock.send(JSON.stringify({ Action: 'Queues' }))
    this.sock.send(JSON.stringify({ Action: 'CoreStatus' }))
    this.sock.send(JSON.stringify({ Action: 'QueueStatus' }))
  }

  this.sock.onmessage = (ev) => {
    this.store.dispatch('newMessage', ev.data)
  }

// public method
  Vue.websockSend = (jsonMsg) => {
    this.sock.send(jsonMsg)
  }

// instance methods
  Vue.prototype.$wsSend = function (msg) {}
}

export default WS
