import 'babel-polyfill'
import { mount, createLocalVue } from 'vue-test-utils'
import Vuex from 'vuex'
import BootstrapVue from 'bootstrap-vue'
import TopStats from '@/components/TopStats'
import * as mtype from '@/store/mutation-types'
import store from '@/store'
import Fixtures from './fixtures/TopStats'

const localVue = createLocalVue()

localVue.use(Vuex)
localVue.use(BootstrapVue)

describe('TopStats', () => {
  beforeEach(() => {
    store.commit(mtype.CLEAR_QUEUES_LIST)
  })

  it('has 4 main cards', () => {
    const comp = mount(TopStats, { store, localVue })
    expect(comp.findAll('.stats-card').length).to.equal(4)
  })

  it('show acive calls from one queue', () => {
    Fixtures.oneQueue.forEach(msg => store.dispatch('newMessage', msg))
    const comp = mount(TopStats, { store, localVue })
    expect(comp.contains('.active-calls')).to.equal(true)
    expect(comp.findAll('.active-calls .calls-num').at(0).text().trim())
      .to.equal('5')
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

  it('show service level for one queue', () => {
    Fixtures.oneQueue.forEach(msg => store.dispatch('newMessage', msg))
    const comp = mount(TopStats, { store, localVue })
    expect(comp.contains('.service-level')).to.equal(true)
    expect(comp.findAll('.service-level .level').at(0).text().trim())
      .to.equal('3.43')
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
})
