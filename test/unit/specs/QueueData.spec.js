import 'babel-polyfill'
import { mount, createLocalVue } from 'vue-test-utils'
import Vuex from 'vuex'
import BootstrapVue from 'bootstrap-vue'

import QueueData from '@/components/QueueData'
import * as mtype from '@/store/mutation-types'
import store from '@/store'
import Fixtures from './fixtures/QueueData'

const localVue = createLocalVue()

localVue.use(Vuex)
localVue.use(BootstrapVue)

describe('QueueData', () => {
  beforeEach(() => {
    store.commit(mtype.CLEAR_QUEUES_LIST)
    store.commit(mtype.SET_SELECTED_QUEUE, '')
  })

  it('has root elements', () => {
    const comp = mount(QueueData, { store, localVue })
    expect(comp.contains('.members')).to.equal(true)
    expect(comp.contains('.callers')).to.equal(true)
  })

  it('handles queue with no callers and no members', () => {
    Fixtures.oneEmptyQueue.forEach(msg => store.dispatch('newMessage', msg))
    const comp = mount(QueueData, { store, localVue })
    expect(comp.contains('.member-card')).to.equal(false)
    expect(comp.contains('.caller-card')).to.equal(false)
  })

  it('handles queue with one member and no callers', () => {
    Fixtures.oneQueueWithOneMemeberNoCallers.forEach(msg => store.dispatch('newMessage', msg))
    store.dispatch('selectedQueue', 'TechSupport')
    const comp = mount(QueueData, { store, localVue })
    expect(comp.findAll('.member-card').length).to.equal(1)
    expect(comp.findAll('.caller-card').length).to.equal(0)
  })

  it('handles queue with one member and one caller', () => {
    Fixtures.oneQueueWithOneMemeberOneCaller.forEach(msg => store.dispatch('newMessage', msg))
    store.dispatch('selectedQueue', 'TechSupport')
    const comp = mount(QueueData, { store, localVue })
    expect(comp.findAll('.member-card').length).to.equal(1)
    expect(comp.findAll('.caller-card').length).to.equal(1)
  })
})
