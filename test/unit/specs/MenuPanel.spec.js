import 'babel-polyfill'
import { mount, createLocalVue } from 'vue-test-utils'
import Vuex from 'vuex'
import BootstrapVue from 'bootstrap-vue'

import * as mtype from '@/store/mutation-types'
import store from '@/store'
import Fixtures from './fixtures/MenuPanel'
import MenuPanel from '@/components/MenuPanel'

const localVue = createLocalVue()

localVue.use(Vuex)
localVue.use(BootstrapVue)

describe('MenuPanel', () => {
  beforeEach(() => {
    store.commit(mtype.CLEAR_QUEUES_LIST)
  })

  it('do not show pagination when less queues then perPage param', () => {
    Fixtures.sixQueues.forEach(msg => store.dispatch('newMessage', msg))
    const comp = mount(MenuPanel, { store, localVue })
    expect(comp.contains('.pagination')).to.equal(false)
  })

  it('show pagination when more quese then per page param', () => {
    Fixtures.sixQueues.forEach(msg => store.dispatch('newMessage', msg))
    store.dispatch('setPerPage', 2)
    const comp = mount(MenuPanel, { store, localVue })
    expect(comp.findAll('.page-item').length).to.equal(7) // 3 pages + first/prev next/last
  })

/*
  it('update current page on pagination click', done => {
    Fixtures.sixQueues.forEach(msg => store.dispatch('newMessage', msg))
    store.dispatch('setPerPage', 2)
    const comp = mount(MenuPanel, { store, localVue })
    comp.findAll('.page-item').at(3).trigger('click')
    localVue.nextTick(() => {
      expect(store.state.pagination.currentPage).to.equal(2)
      done()
    })
  })
*/
})
