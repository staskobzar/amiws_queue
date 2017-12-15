import 'babel-polyfill'
import { mount, createLocalVue } from 'vue-test-utils'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import sinon from 'sinon'

import * as mtype from '@/store/mutation-types'
import store from '@/store'
import Fixtures from './fixtures/MenuPanel'
import MenuPanel from '@/components/MenuPanel'

const localVue = createLocalVue()

localVue.use(Vuex)
localVue.use(Vuetify)

describe('MenuPanel', () => {
  beforeEach(() => {
    store.commit(mtype.CLEAR_QUEUES_LIST)
    store.commit(mtype.CLEAR_AMISRV_LIST)
  })

  it('show only one pagination when less queues then perPage param', () => {
    Fixtures.sixQueues.forEach(msg => store.dispatch('newMessage', msg))
    const comp = mount(MenuPanel, { store, localVue })
    expect(comp.findAll('.pagination__item').length).to.equal(1)
  })

  it('show pagination when more quese then per page param', () => {
    Fixtures.sixQueues.forEach(msg => store.dispatch('newMessage', msg))
    store.dispatch('setPerPage', 2)
    const comp = mount(MenuPanel, { store, localVue })
    expect(comp.findAll('.pagination__item').length).to.equal(3)
  })

  it('confirm box on click pause all agents', done => {
    Fixtures.sixQueues.forEach(msg => store.dispatch('newMessage', msg))
    const comp = mount(MenuPanel, { store, localVue })
    comp.find('#btn-pause-all-agents').trigger('click')
    localVue.nextTick(() => {
      expect(comp.find('.modal-title').text().trim())
        .to.equal('Confirm pause all agents')
      expect(comp.find('.modal-body').text().trim())
        .to.equal(comp.vm.confirm.body)
      done()
    })
  })

  it('confirm box on click activate all agents', done => {
    Fixtures.sixQueues.forEach(msg => store.dispatch('newMessage', msg))
    const comp = mount(MenuPanel, { store, localVue })
    comp.find('#btn-activate-all-agents').trigger('click')
    localVue.nextTick(() => {
      expect(comp.find('.modal-title').text().trim())
        .to.equal('Confirm un-pause all agents')
      expect(comp.find('.modal-body').text().trim())
        .to.equal(comp.vm.confirm.body)
      done()
    })
  })

  it('when confirm all agents pause, call vuex action pauseAllAgents', () => {
    Fixtures.sixQueues.forEach(msg => store.dispatch('newMessage', msg))
    const comp = mount(MenuPanel, { store, localVue })
    comp.vm.pauseAllAgents = sinon.stub()
    comp.vm.doPause()
    expect(comp.vm.pauseAllAgents.callCount).to.equal(6)
  })

  it('update store when current page is changed with pagination', () => {
    const comp = mount(MenuPanel, { store, localVue })
    comp.vm.currentPage = 3
    expect(store.state.pagination.currentPage).to.equal(3)
  })

  it('set current page to "1" when filter changed', () => {
    const comp = mount(MenuPanel, { store, localVue })
    comp.vm.currentPage = 3
    expect(store.state.pagination.currentPage).to.equal(3)
    comp.vm.qnameFilter = 'sales'
    expect(store.state.pagination.currentPage).to.equal(1)
    expect(store.state.qnameFilter).to.equal('sales')
  })
})
