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
