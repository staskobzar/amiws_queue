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

  it('create queue with two members and three callers', () => {
    Fixtures.oneQueueWithTwoMembersThreeCallers.forEach(msg => store.dispatch('newMessage', msg))
    const comp = mount(QueuesList, { store, localVue })
    expect(comp.contains('.queue-card')).to.equal(true)
    expect(comp.find('.queue-card .members').text().trim()).to.equal('2')
    expect(comp.find('.queue-card .callers').text().trim()).to.equal('3')
  })

  it('create queue with one paused and one unpaused members ', () => {
    Fixtures.oneQueueWithTwoMembersThreeCallers.forEach(msg => store.dispatch('newMessage', msg))
    const comp = mount(QueuesList, { store, localVue })
    expect(comp.contains('.queue-card')).to.equal(true)
    expect(comp.find('.queue-card .members-paused').text().trim()).to.equal('1')
    expect(comp.find('.queue-card .members-unpaused').text().trim()).to.equal('1')
  })

  it('create queue with three callers on call and one waiting', () => {
    Fixtures.oneQueueWithTwoMembersThreeCallers.forEach(msg => store.dispatch('newMessage', msg))
    store.dispatch('newMessage', Fixtures.joinCaller)
    const comp = mount(QueuesList, { store, localVue })
    expect(comp.contains('.queue-card')).to.equal(true)
    expect(comp.find('.queue-card .callers-waiting').text().trim()).to.equal('1')
    expect(comp.find('.queue-card .callers-oncall').text().trim()).to.equal('3')
  })
})
