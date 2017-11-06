import 'babel-polyfill'
import { mount, createLocalVue } from 'vue-test-utils'
import Vuex from 'vuex'
import BootstrapVue from 'bootstrap-vue'

import store from '@/store'
// import Fixtures from './fixtures/QueueData'
import QueueData from '@/components/QueueData'

const localVue = createLocalVue()

localVue.use(Vuex)
localVue.use(BootstrapVue)

describe('QueueData', () => {
  it('has root element', () => {
    const comp = mount(QueueData, { store, localVue })
    expect(comp.contains('.members')).to.equal(true)
    expect(comp.contains('.callers')).to.equal(true)
  })
})
