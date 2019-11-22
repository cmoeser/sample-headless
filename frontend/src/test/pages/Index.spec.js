import SMPLSlide from '../../pages/Index.vue'
import { shallowMount, RouterLinkStub, createLocalVue } from '@vue/test-utils'

import store from '../../store/index'
import AppState from '../../store/modules/appState'

import Vuex from 'vuex'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('SMPLSlide', () => {
  let store

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        AppState
      }
    })
  })

  it('is a Vue component', () => {
    const wrapper = shallowMount(SMPLSlide, { store, localVue })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
