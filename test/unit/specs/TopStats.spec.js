import 'babel-polyfill'
import { mount, createLocalVue } from 'vue-test-utils'
import Vue from 'vue'
import Vuex from 'vuex'
import TopStats from '@/components/TopStats'
import * as mtype from '@/store/mutation-types'
import store from '@/store'
import Fixtures from './fixtures/TopStats'

const localVue = createLocalVue()

localVue.use(Vuex)
Vue.websockSend = sinon.stub()

describe('TopStats', () => {
  beforeEach(() => {
    store.dispatch('setQueuesFilter', '')
    store.commit(mtype.CLEAR_QUEUES_LIST)
  })

  it('has 3 main cards', () => {
    const comp = mount(TopStats, { store, localVue })
    expect(comp.findAll('.stats-card').length).to.equal(3)
  })

  it('show acive calls from one queue', () => {
    Fixtures.oneQueue.forEach(msg => store.dispatch('newMessage', msg))
    const comp = mount(TopStats, { store, localVue })
    expect(comp.contains('.active-calls')).to.equal(true)
    expect(comp.findAll('.active-calls .calls-num').at(0).text().trim())
      .to.equal('4')
  })

  it('show waiting calls from one queue', () => {
    Fixtures.newCallersJoins.forEach(msg => store.dispatch('newMessage', msg))
    const comp = mount(TopStats, { store, localVue })
    expect(comp.contains('.active-calls')).to.equal(true)
    expect(comp.findAll('.active-calls .calls-wait').at(0).text().trim())
      .to.equal('2')
  })

  it('show Abandoned/Answered calls from one queue', () => {
    Fixtures.oneQueue.forEach(msg => store.dispatch('newMessage', msg))
    const comp = mount(TopStats, { store, localVue })
    expect(comp.contains('.calls-processed')).to.equal(true)
    expect(comp.findAll('.calls-processed .calls-completed').at(0).text().trim())
      .to.equal('231')
    expect(comp.findAll('.calls-processed .calls-abandoned').at(0).text().trim())
      .to.equal('120')
  })

  it('show paused/unpaused agents for one queue', () => {
    Fixtures.oneQueueWithThreeMembers.forEach(msg => store.dispatch('newMessage', msg))
    const comp = mount(TopStats, { store, localVue })
    expect(comp.contains('.members')).to.equal(true)
    expect(comp.findAll('.members .total').at(0).text().trim())
      .to.equal('3')
    expect(comp.findAll('.members .paused').at(0).text().trim())
      .to.equal('1')
    expect(comp.findAll('.members .unpaused').at(0).text().trim())
      .to.equal('2')
  })

  it('show paused/unpaused agents for one queue and update member status', () => {
    Fixtures.oneQueueWithThreeMembersUpdate.forEach(msg => store.dispatch('newMessage', msg))
    const comp = mount(TopStats, { store, localVue })
    expect(comp.contains('.members')).to.equal(true)
    expect(comp.findAll('.members .total').at(0).text().trim())
      .to.equal('3')
    expect(comp.findAll('.members .paused').at(0).text().trim())
      .to.equal('2')
    expect(comp.findAll('.members .unpaused').at(0).text().trim())
      .to.equal('1')
  })

  it('add new member to queue', done => {
    Fixtures.oneQueueWithThreeMembers.forEach(msg => store.dispatch('newMessage', msg))
    const comp = mount(TopStats, { store, localVue })
    expect(comp.contains('.members')).to.equal(true)
    expect(comp.findAll('.members .total').at(0).text().trim())
      .to.equal('3')
    expect(comp.findAll('.members .paused').at(0).text().trim())
      .to.equal('1')
    expect(comp.findAll('.members .unpaused').at(0).text().trim())
      .to.equal('2')
    store.dispatch('newMessage', Fixtures.addMember)
    localVue.nextTick(() => {
      expect(comp.findAll('.members .total').at(0).text().trim())
        .to.equal('4')
      expect(comp.findAll('.members .paused').at(0).text().trim())
        .to.equal('1')
      expect(comp.findAll('.members .unpaused').at(0).text().trim())
        .to.equal('3')
      done()
    })
  })

  it('remove member from queue', done => {
    Fixtures.oneQueueWithThreeMembers.forEach(msg => store.dispatch('newMessage', msg))
    const comp = mount(TopStats, { store, localVue })
    expect(comp.contains('.members')).to.equal(true)
    expect(comp.findAll('.members .total').at(0).text().trim())
      .to.equal('3')
    expect(comp.findAll('.members .paused').at(0).text().trim())
      .to.equal('1')
    expect(comp.findAll('.members .unpaused').at(0).text().trim())
      .to.equal('2')
    store.dispatch('newMessage', Fixtures.removeMember)
    localVue.nextTick(() => {
      expect(comp.findAll('.members .total').at(0).text().trim())
        .to.equal('2')
      expect(comp.findAll('.members .paused').at(0).text().trim())
        .to.equal('1')
      expect(comp.findAll('.members .unpaused').at(0).text().trim())
        .to.equal('1')
      done()
    })
  })

  it('updates "Waiting" when caller joins the queue and then leaves', done => {
    Fixtures.newCallersJoins.forEach(msg => store.dispatch('newMessage', msg))
    const comp = mount(TopStats, { store, localVue })
    expect(comp.findAll('.active-calls .calls-wait').at(0).text().trim())
      .to.equal('2')
    store.dispatch('newMessage', Fixtures.callerLeaves)
    localVue.nextTick(() => {
      expect(comp.findAll('.active-calls .calls-wait').at(0).text().trim())
        .to.equal('1')
      done()
    })
  })

  it('updates "Waiting" when caller joins the queue and then leaves with QueueCallerLeave', done => {
    Fixtures.newCallersJoins.forEach(msg => store.dispatch('newMessage', msg))
    const comp = mount(TopStats, { store, localVue })
    expect(comp.findAll('.active-calls .calls-wait').at(0).text().trim())
      .to.equal('2')
    store.dispatch('newMessage', Fixtures.queueCallerLeave)
    localVue.nextTick(() => {
      expect(comp.findAll('.active-calls .calls-wait').at(0).text().trim())
        .to.equal('1')
      done()
    })
  })

  it('updates queue completed calls when caller hangup')
  /*
  it('updates queue completed calls when caller hangup', done => {
    Fixtures.oneQueue.forEach(msg => store.dispatch('newMessage', msg))
    const comp = mount(TopStats, { store, localVue })
    expect(comp.findAll('.calls-processed .calls-completed').at(0).text().trim())
      .to.equal('231')
    store.dispatch('newMessage', Fixtures.callerHangup)
    localVue.nextTick(() => {
      expect(comp.findAll('.calls-processed .calls-completed').at(0).text().trim())
        .to.equal('232')
      done()
    })
  })
  */

  it('updates queue abandoned calls', done => {
    Fixtures.oneQueue.forEach(msg => store.dispatch('newMessage', msg))
    const comp = mount(TopStats, { store, localVue })
    expect(comp.findAll('.calls-processed .calls-abandoned').at(0).text().trim())
      .to.equal('120')
    store.dispatch('newMessage', Fixtures.callerAbandoned)
    localVue.nextTick(() => {
      expect(comp.findAll('.calls-processed .calls-abandoned').at(0).text().trim())
        .to.equal('121')
      done()
    })
  })
})
