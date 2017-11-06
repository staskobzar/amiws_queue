import 'babel-polyfill'
import { mount, createLocalVue } from 'vue-test-utils'
import Vuex from 'vuex'
import BootstrapVue from 'bootstrap-vue'

import * as mtype from '@/store/mutation-types'
import store from '@/store'
import Fixtures from './fixtures/QueueList'
import QueuesList from '@/components/QueuesList'

const localVue = createLocalVue()

localVue.use(Vuex)
localVue.use(BootstrapVue)

describe('QueuesList', () => {
  beforeEach(() => {
    store.commit(mtype.CLEAR_QUEUES_LIST)
  })

  it('init with empty queues list', () => {
    const comp = mount(QueuesList, { store, localVue })
    expect(comp.contains('.queue-card')).to.equal(false)
  })

  it('create one queue from AMI message', () => {
    Fixtures.oneEmptyQueue.forEach(msg => store.dispatch('newMessage', msg))
    const comp = mount(QueuesList, { store, localVue })
    expect(comp.contains('.queue-card')).to.equal(true)
    expect(comp.findAll('.queue-card').length).to.equal(1)
  })

  it('create two queues from AMI messages', () => {
    Fixtures.twoEmptyQueues.forEach(msg => store.dispatch('newMessage', msg))
    const comp = mount(QueuesList, { store, localVue })
    expect(comp.contains('.queue-card')).to.equal(true)
    expect(comp.findAll('.queue-card').length).to.equal(2)
  })

  it('create server with two queues and update one queue', () => {
    Fixtures.twoQueuesAndUpdateQueue.forEach(msg => store.dispatch('newMessage', msg))
    const comp = mount(QueuesList, { store, localVue })
    expect(comp.contains('.queue-card')).to.equal(true)
    expect(comp.findAll('.queue-card').length).to.equal(2)
  })
})
