import { mutationTypes } from '../store/mutation-types'

/**
 *  @name - App
 *
 *  @desc - On route change let our app state know so we can close the mobile menu between route changes
 *
 *  @author - Chip Moeser 
 *
 *  Sat Nov 23 06:23:42 EST 2019
 */
export default context => {
  // We want menu mobile to close when changing page.
  if (process.client) {
    window.onNuxtReady(app => {
      app.$nuxt.$on('routeChanged', (to, from) => {
        app.$store.commit('appState/' + mutationTypes.SET_MENU_MOBILE_OPEN, false)
      })
    })
  }
}
