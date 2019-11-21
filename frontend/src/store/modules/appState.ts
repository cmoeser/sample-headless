import { getterTypes } from '../getter-types'
import { mutationTypes } from '../mutation-types'
import { Module, Mutation, VuexModule } from 'vuex-module-decorators'
import { AppColors } from '~/src/typings/vue'

// Typings
import { EntityMetaTags } from '../../typings/vue'

/**
 *  @name - AppState
 *
 *  @desc - App State Module. Handles global app state items.
 *
 *  @author - Chip Moeser 
 *
 *  ###### Wed Nov 20 19:56:55 EST 2019
 */

@Module({
  stateFactory: true,
  namespaced: true,
  name: 'appState'
})
export default class AppModule extends VuexModule {
  /**
   * AppColors
   *
   * @description - Colors for the app
   *
   * @type - AppColors - ~/src/typings/vue
   */
  private appColors: AppColors = {
    lakeBlue: '#002b49',
    midnightBlue: '#002639',
    innovativeRed: '#ff4438',
    coolSlate: '#323e48',
    techSilver: '#cfd2d3',
    letsGoGreen: '#00bbb4',
    winterSkyBlue: '#63cfe3',
    adventurYellow: '#ffd600',
    white: '#ffffff',
    black: '#000000'
  }
  /**
   * menuMobileIsOpened
   *
   * @description - The state of the mobile menu true/false
   *
   * @type - boolean
   */
  private menuMobileIsOpened: boolean = false
  /**
   * baseURL
   *
   * @description - URL of the Backend API
   *
   * @type - string
   *
   */
  private baseURL: string = 'https://dev-sample-headless-backend.pantheonsite.io'

  /**
   * pageMeta
   *
   * @description - Metatags for pages. Defaults set as empty strings so doesn't break if missing a tag on Drupal side.
   *
   * @type - MetaResponseObject
   */
  private pageMeta: EntityMetaTags = {
    entityMetatags: [
      { key: 'description', value: '', __typename: 'MetaValue' },
      { key: 'og:image:url', value: '', __typename: 'MetaValue' },
      { key: 'og:image:width', value: '', __typename: 'MetaValue' },
      { key: 'og:image:height', value: '', __typename: 'MetaValue' },
      { key: 'og:description', value: '', __typename: 'MetaValue' },
      { key: 'og:title', value: '', __typename: 'MetaValue' },
      { key: 'og:url', value: '', __typename: 'MetaValue' },
      { key: 'canonical', value: '', __typename: 'MetaValue' },
      { key: 'title', value: '', __typename: 'MetaValue' }
    ]
  };

  /**
   * SET_MENU_MOBILE_OPEN
   *
   * @description - Sets the state of the mobile menu menuMobileIsOpened true/false
   *
   * @param - value: boolean - true/false if mobile menu is open
   */
  @Mutation
  [mutationTypes.SET_MENU_MOBILE_OPEN](value: boolean): void {
    this.menuMobileIsOpened = value
  }

  /**
   * SET_PAGE_META
   *
   * @description -
   *
   * @param - value:
   */
  @Mutation
  [mutationTypes.SET_PAGE_META](value: any): void {
    // filter out meta that is returned by the api call so wee keep defaults.
    const arr = this.pageMeta.entityMetatags.filter(obj => {
      return value.entityMetatags.find(item => item.key === obj.key) === undefined ? true : false
    })

    this.pageMeta.entityMetatags = arr.concat(value.entityMetatags)
  }

  /**
   * GET_MOBILE_MENU_OPEN
   *
   * @description - Gets the state of the mobile menu menuMobileIsOpened true/false
   *
   * @returns - this.menuMobileIsOpened: boolean
   */
  get [getterTypes.GET_MOBILE_MENU_OPEN](): boolean {
    return this.menuMobileIsOpened
  }

}
