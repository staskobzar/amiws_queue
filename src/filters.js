import Vue from 'vue'
/**
 * Convert seconds to human readable format HH:MM:SS
 */
Vue.filter('formatTime', (val) => {
  return [
    Math.floor(val / 3600),    // hours
    Math.floor(val / 60) % 60, // minutes
    val % 60                   // seconds
  ].map(e => e >= 10 ? `${e}` : `0${e}`).join(':')
})

Vue.filter('formatFromUnixtime', (val) => {
  if (+val <= 0) {
    return 'N/A'
  }
  const t = new Date(val * 1000)
  const pad = (num) => num < 10 ? `0${num}` : `${num}`
  const [y, m, d] = [t.getFullYear(), t.getMonth(), t.getDate()]
  const [hh, mm, ss] = [t.getHours(), t.getMinutes(), t.getSeconds()]
  const date = `${y}-${pad(m + 1)}-${pad(d)}`
  const time = `${pad(hh)}:${pad(mm)}:${pad(ss)}`
  return `${date} ${time}`
})
