import { mutationTypes } from '../mutation-types'
import { getterTypes } from '../getter-types'
import { actionTypes } from '../action-types'
import { Module, Mutation, VuexModule, Action, MutationAction } from 'vuex-module-decorators'
import { FPOptions } from '~/src/typings/vue'

// GraphQL
import gql from 'graphql-tag'
import graphqlClient from '../../apollo/clients/default'
/**
 *  @name - SlidesState
 *
 *  @desc - State for FullPageJS slides.
 *
 *  @author - Chip Moeser
 *
 *  Mon May 13 12:29:13 EDT 2019
 */

@Module({
  stateFactory: true,
  namespaced: true,
  name: 'slidesState'
})
export default class SlidesModule extends VuexModule {
  public slides: object = {}
  /**
   * slideTone
   *
   * @description - Light/Dark tone of a slide. Used for hamburger over color
   *
   * @type - string
   */
  private slideTone: string = 'dark'

  /**
   * slideColor
   *
   * @description - Color of a slide
   *
   * @type - string
   */
  private slideColor: string = ''

  /**
   * fpOptions
   *
   * @description - Default options for FullPageJS. Overriden locally.
   *
   * @type - string
   */
  private fpOptions: FPOptions = {
    licenseKey: 'DCBF49F5-499D4B92-8110FB9D-23AD4D8F',

    // Accessibility
    keyboardScrolling: true,
    animateAnchor: true,
    recordHistory: false,

    // Design
    controlArrows: true,
    paddingTop: '0px',
    paddingBottom: '0px',
    fixedElements: '',

    // Scrolling
    scrollBar: true,

    menu: '#menu',
    navigation: false,
    responsiveWidth: 960,
    anchors: []
  }

  /**
   * @name - GET_SLIDE_COLOR
   *
   * @description - Gets the slide tone light/dark
   *
   * @param slideTone
   *
   * @returns - this.slideColor: string
   */
  get [getterTypes.GET_SLIDE_COLOR](): string {
    return this.slideColor
  }

  /**
   * @name - SET_SLIDE_TONE
   *
   * @description - Sets the slide tone light/dark
   *
   * @param slideTone: string
   */
  @Mutation
  [mutationTypes.SET_SLIDE_TONE](slideTone: string): void {
    this.slideTone = slideTone
  }
  /**
   * @name - SET_SLIDE_COLOR
   *
   * @description - Sets the slide color
   *
   * @param - slideColor: string
   */
  @Mutation
  [mutationTypes.SET_SLIDE_COLOR](slideColor: string): void {
    this.slideColor = slideColor
  }

  /**
   * SET_SLIDE_CONFIG
   *
   * @description - Sets the slide config object for local overrrides
   *
   * @param slideOptions:FPOptions
   */
  @Mutation
  [mutationTypes.SET_SLIDE_CONFIG](slideOptions: FPOptions): void {
    Object.assign(this.fpOptions, slideOptions)
  }

  /**
   * GET_SLIDES
   *
   * @description -
   *
   * @param - mutate
   */
  @MutationAction({ mutate: ['slides'] })
  async [actionTypes.GET_SLIDES](nodeAlias: string) {
    const response: any = await graphqlClient.query({
      query: gql`
        fragment slideshowFragment on ParagraphSlideshow {
          ... on ParagraphSlideshow {
            fieldPanelHeader
            fieldSlide {
              entity {
                ...slideFragment
              }
            }
          }
        }
        fragment slideFragment on ParagraphSlide {
          ... on ParagraphSlide {
            fieldSlideText
            fieldSlideBody
            fieldSlideImage {
              alt
              sm: derivative(style: MOBILE) {
                url
              }
              md: derivative(style: TABLET) {
                url
              }
              lg: derivative(style: DESKTOP) {
                url
              }
              xlg: derivative(style: EXTRALARGE) {
                url
              }
            }
          }
        }

        query pageGqlView($field_alias_value: String!) {
          pageGqlView(contextualFilter: { field_alias_value: $field_alias_value }) {
            results {
              ... on NodePage {
                fieldPanels {
                  entity {
                    ...slideshowFragment
                  }
                }
              }
            }
          }
        }
      `,
      variables: { field_alias_value: nodeAlias }
    })
    console.log('Page RESP: ', response.data.pageGqlView.results[0].fieldPanels[0].entity)
    return {
      slides: response.data.pageGqlView.results[0].fieldPanels[0].entity
    }
  }
}
