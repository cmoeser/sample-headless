<template>
  <div class="home">
    <no-ssr>
      <full-page :options="fpOptions">
        <section role="region" class="section" data-tone="dark">
          <div
            v-bind:style="{ backgroundImage: 'url(/images/team_slide_1_full.jpg)' }"
            class="slide"
          >
            <div class="slide-content">
              <h1>Silly Things</h1>
              <div class="slide-title">cxzcxzcxsdsfsdf.</div>
              <div class="slide-tagline">ccxc.</div>
            </div>
          </div>
          <div class="slide">
            <picture>
              <source srcset="/images/team_slide_2_small.jpg" media="(max-width: 599px)" />
              <source srcset="/images/team_slide_2_med.jpg" media="(min-width: 959px)" />
              <source srcset="/images/team_slide_2_full.jpg" media="(min-width: 1201px)" />
              <img src="/images/team_slide_2_med.jpg" alt="team slide 1" />
            </picture>
          </div>
          <div class="slide">
            <picture>
              <source srcset="/images/team_slide_3_small.jpg" media="(max-width: 599px)" />
              <source srcset="/images/team_slide_3_med.jpg" media="(min-width: 959px)" />
              <source srcset="/images/team_slide_3_full.jpg" media="(min-width: 1201px)" />
              <img src="/images/team_slide_3_med.jpg" alt="team slide 2" />
            </picture>
          </div>
          <div class="slide">
            <picture>
              <source srcset="/images/team_slide_4_small.jpg" media="(max-width: 599px)" />
              <source srcset="/images/team_slide_4_med.jpg" media="(min-width: 959px)" />
              <source srcset="/images/team_slide_4_full.jpg" media="(min-width: 1201px)" />
              <img src="/images/team_slide_4_med.jpg" alt="team slide 3" />
            </picture>
          </div>
          <div class="slide">
            <picture>
              <source srcset="/images/team_slide_5_small.jpg" media="(max-width: 599px)" />
              <source srcset="/images/team_slide_5_med.jpg" media="(min-width: 959px)" />
              <source srcset="/images/team_slide_5_full.jpg" media="(min-width: 1201px)" />
              <img src="/images/team_slide_5_med.jpg" alt="team slide 4" />
            </picture>
          </div>
          <div class="slide">
            <picture>
              <source srcset="/images/team_slide_6_small.jpg" media="(max-width: 599px)" />
              <source srcset="/images/team_slide_6_med.jpg" media="(min-width: 959px)" />
              <source srcset="/images/team_slide_6_full.jpg" media="(min-width: 1201px)" />
              <img src="/images/team_slide_6_med.jpg" alt="team slide 5" />
            </picture>
          </div>
          <div class="slide">
            <picture>
              <source srcset="/images/team_slide_7_small.jpg" media="(max-width: 599px)" />
              <source srcset="/images/team_slide_7_med.jpg" media="(min-width: 959px)" />
              <source srcset="/images/team_slide_7_full.jpg" media="(min-width: 1201px)" />
              <img src="/images/team_slide_7_med.jpg" alt="team slide 6" />
            </picture>
          </div>
        </section>
      </full-page>
    </no-ssr>
    <AppVersion />
  </div>
</template>

<script lang="ts">
// Core
import { Vue, Component, Watch } from 'vue-property-decorator'
import { Mixins } from 'vue-mixin-decorator'
import { State, Getter, Action, Mutation, namespace } from 'vuex-class'
// Store
import { StateBindingHelper } from 'vuex-class/lib/bindings'
import { actionTypes } from '../store/action-types'
import { getterTypes } from '../store/getter-types'
import { mutationTypes } from '../store/mutation-types'
// Utils/extend
import BaseSlide from '../mixins/BaseSlide'
// Components
import AppVersion from '../components/AppVersion.vue'

// GraphQL
import graphqlClient from '../apollo/clients/default'
import gql from 'graphql-tag'
import { constants } from 'os'

/**
 *  sample Front End
 *  @desc Index page for sample site.
 *
 *  @author Chip Moeser
 *
 * Wed Nov 20 19:52:41 EST 2019
 */

@Component({ components: { AppVersion } })
export default class WKSSlide extends Mixins(BaseSlide) {
  /**
   * @name - currentSlide
   *
   * @descrition - Text used to indicate to the user, the current slide ex: 1/5 etc.
   *
   * @type - string
   *
   */
  private currentSlide: string = '1/'

  /**
   * @name - totalSlides
   *
   * @descrition - Total Slides
   *
   * @type - number
   *
   */
  private totalSlides: number = 1

  /**
   * @name - Created
   *
   * @description - Created lifecycle hook. Upon creation of this component we set the sldie options overrride and get client logos
   */
  private created() {
    this.localOptions = {
      sectionsColor: [this.appColors.midnightBlue, this.appColors.white, this.appColors.midnightBlue],

      onSlideLeave: this.onSlideLeave,
      afterRender: this.setTotalSlides,
      navigation: false,
      scrollBar: true,
      autoScrolling: false,
      fitToSection: false,
      fitToSectionDelay: 0
    }

    this.setSlideConfig(this.localOptions)
    this.fetchSlides()
  }

  private fetchSlides() {
    const func = async (nodeAlias: string) => {
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
              fieldSlideImage {
                alt
                sm: derivative(style: _600X500) {
                  url
                }
                md: derivative(style: _960X500) {
                  url
                }
                lg: derivative(style: _1200X600) {
                  url
                }
                xlg: derivative(style: _1400X800) {
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
     console.log('Page RESP: ', response.data.pageGqlView.results[0])
    }
    func('/sample-page')
  }

  /**
   * @name setTotalSlides
   *
   * @description - Sets the total slides to the amount of images
   *
   */
  private setTotalSlides(): void {
    this.totalSlides = 7
    this.slideNumbers()
  }

  /**
   * @name - slideNumbers
   *
   * @description - Sets total slides based on html element length, creates numbers and appends
   *
   */
  private slideNumbers(): void {
    if (process.client) {
      const ctrlArrow: Element | null = document.querySelector('.fp-next')

      if (ctrlArrow) {
        const slideNumbers: HTMLElement = document.createElement('div')
        slideNumbers.className = 'slide__numbers'
        this.currentSlide = `${this.currentSlide}${this.totalSlides}`
        slideNumbers.innerHTML = this.currentSlide
        ctrlArrow.appendChild(slideNumbers)
      }
    }
  }

  /**
   * @name - onSlideLeave
   *
   * @description - After slide leave function
   *
   * @param - section: object
   *
   * @param - destination: object
   *
   * @param - direction: string
   */
  private onSlideLeave(section: object, origin: object, destination, direction: string): void {
    const slideNumbers = document.querySelector('.slide__numbers')

    if (slideNumbers) {
      this.currentSlide = `${destination.index + 1}/${this.totalSlides}`
      slideNumbers.innerHTML = this.currentSlide
    }

    // console.log('section: ', section, 'origin: ', origin, 'destination: ', destination, 'direction: ', direction)
  }
}
</script>

<style lang="postcss">
@import '../assets/css/grid_settings.css';
@import '../assets/css/modules/section.css';
@import '../assets/css/modules/slides.css';
@import '../assets/css/modules/fullscreen-overrides.css';

/*****************************************************
*
*  Media Queries
*
********************************************************/

/**
*  Small Viewport < 60em/960px
*/
@media screen and (--small-viewport) {
}

/**
*  Large Viewport  > 75em/1201px
*/
@media screen and (--large-viewport) {
}
</style>
