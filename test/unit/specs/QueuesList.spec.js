import 'babel-polyfill'
import { mount, createLocalVue } from 'vue-test-utils'
import Vuex from 'vuex'
import BootstrapVue from 'bootstrap-vue'
import sinon from 'sinon'

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
    store.dispatch('setPerPage', 10)
    store.dispatch('setCurPage', 1)
    store.dispatch('setQueuesFilter', '')
    store.state.loading = 0
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

  it('update queue stats on summary message packet', done => {
    Fixtures.oneEmptyQueue.forEach(msg => store.dispatch('newMessage', msg))
    const comp = mount(QueuesList, { store, localVue })
    expect(comp.contains('.queue-card')).to.equal(true)
    expect(comp.find('.queue-card .holdtime').text().trim()).to.equal('00:00:10')
    expect(comp.find('.queue-card .talktime').text().trim()).to.equal('00:01:40')
    store.dispatch('newMessage', Fixtures.queueSummaryResp)
    localVue.nextTick(() => {
      expect(comp.find('.queue-card .holdtime').text().trim()).to.equal('00:05:45')
      expect(comp.find('.queue-card .talktime').text().trim()).to.equal('00:16:27')
      done()
    })
  })

  it('update queue members status pause/unpause', done => {
    Fixtures.oneQueueWithTwoMembersThreeCallers.forEach(msg => store.dispatch('newMessage', msg))
    const comp = mount(QueuesList, { store, localVue })
    expect(comp.contains('.queue-card')).to.equal(true)
    expect(comp.find('.queue-card .members-paused').text().trim()).to.equal('1')
    expect(comp.find('.queue-card .members-unpaused').text().trim()).to.equal('1')
    store.dispatch('newMessage', Fixtures.unpauseMemeber)
    localVue.nextTick(() => {
      expect(comp.find('.queue-card .members-paused').text().trim()).to.equal('2')
      done()
    })
  })

  it('with pagination perPage equals "3" will display page with three queues', () => {
    Fixtures.sixQueues.forEach(msg => store.dispatch('newMessage', msg))
    store.dispatch('setPerPage', 3)
    const comp = mount(QueuesList, { store, localVue })
    expect(comp.contains('.queue-card')).to.equal(true)
    expect(comp.findAll('.queue-card').length).to.equal(3)
  })

  it('with pagination current page is updates, show next page', () => {
    Fixtures.sixQueues.forEach(msg => store.dispatch('newMessage', msg))
    store.dispatch('setPerPage', 3)
    store.dispatch('setCurPage', 2)
    const comp = mount(QueuesList, { store, localVue })
    expect(comp.contains('.queue-card')).to.equal(true)
    expect(comp.findAll('.queue-card').length).to.equal(3)
    expect(comp.findAll('.queue-card .card-header').at(0).text().trim())
      .to.equal('Reception')
  })

  it('filter queues list by queue name case insencetive', () => {
    Fixtures.sixQueues.forEach(msg => store.dispatch('newMessage', msg))
    store.dispatch('setQueuesFilter', 'sales')
    const comp = mount(QueuesList, { store, localVue })
    expect(comp.contains('.queue-card')).to.equal(true)
    expect(comp.findAll('.queue-card').length).to.equal(2)
  })

  it('set all members paused for selected queue', () => {
    Fixtures.oneQueueWithTwoMembersThreeCallers.forEach(msg => store.dispatch('newMessage', msg))
    store.dispatch('setQueuesFilter', 'TechSupport')
    const comp = mount(QueuesList, { store, localVue, methods: { $notify: () => {} } })
    comp.vm.pauseAllAgents = sinon.stub()
    comp.vm.pauseAll()
    expect(comp.vm.pauseAllAgents.callCount).to.equal(1)
  })

  it('update flag when start loading queues list', () => {
    store.dispatch('newMessage', Fixtures.startQueuesList)
    expect(store.state.loading).to.equal(1)
  })

  it('update flag when finish loading queues list', () => {
    store.dispatch('newMessage', Fixtures.startQueuesList)
    store.dispatch('newMessage', Fixtures.startQueuesList)
    store.dispatch('newMessage', Fixtures.startQueuesList)
    store.dispatch('newMessage', Fixtures.finishQueueList)
    expect(store.getters.getLoading).to.equal(2)
  })
})
