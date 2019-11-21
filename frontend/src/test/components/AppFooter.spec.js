import AppFooter from '../../components/AppFOoter'
import { mount, RouterLinkStub } from '@vue/test-utils'

describe('AppFOoter', () => {
  it('is a Vue component', () => {
    const wrapper = mount(AppFooter, {
      stubs: {
        NuxtLink: RouterLinkStub
      }
    })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
