import Vue from 'vue'

Vue.config.productionTip = false

// require all test files (files that ends with .spec.js)
const testsContext = require.context('./specs', true, /\.spec$/)
testsContext.keys().forEach(testsContext)

// require all src files except main.js for coverage.
// you can also change this to match only the subset of files that
// you want coverage for.
const srcContext = require.context('../../src', true, /^\.\/(?!(main(\.js)?|websock.*|logger(\.js)?|App(\.vue)?)$)/)
// console.log(srcContext.keys())
srcContext.keys().forEach(srcContext)

/*
 * make Vuetify app element to avoid warnings
 */
var app = document.createElement('div')
app.setAttribute('data-app', true)
document.body.appendChild(app)
// -- done
