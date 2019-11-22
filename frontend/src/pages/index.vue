<template>
  <div class="home">
    <no-ssr>
      <full-page :options="fpOptions"  v-if="this.slides">
        <section role="region" class="section" data-tone="dark">
              <div class="slide" v-for="(slide, index) in this.slides.fieldSlide" :key="index">
                <picture>
                  <source :srcset="slide.entity.fieldSlideImage.sm.url" media="(max-width: 599px)" />
                  <source :srcset="slide.entity.fieldSlideImage.md.url" media="(min-width: 959px)" />
                  <source :srcset="slide.entity.fieldSlideImage.lg.url" media="(min-width: 1201px)" />
                  <source
                    :srcset="slide.entity.fieldSlideImage.xlg.url"
                    media="(min-width: 1601px)"
                  />
                  <img :src="slide.entity.fieldSlideImage.md.url" :alt="slide.entity.fieldSlideImage.alt" />
                </picture>
          </div>
        </section>
      </full-page>
    </no-ssr>
    <AppVersion/>
  </div>
</template>

<script lang="ts">
// Core
import { Vue, Component, Watch } from 'vue-property-decorator'
import { Mixins } from 'vue-mixin-decorator'
import { State, Getter, Action, Mutation, namespace } from 'vuex-class'
import { MutationAction } from 'vuex-module-decorators'
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
  /*
  * GET_SLIDES
  * @descrition - 
  * @decorator - @Action
  * @name - actionTypes.GET_SLIDES
  * @type - Action<T>
  * @arguments - namespace - 
  * */
  @Action(actionTypes.GET_SLIDES, { namespace: 'slidesState' })
  getSlides: (nodeAlias: string) => {}

  /*
  * slides
  * @descrition - The slides object from Drupal 
  * @decorator - @State
  * @name - slides
  * @type - State<T>
  * @arguments - namespace - slidesState
  * */
  @State('slides', { namespace: 'slidesState' })
  slides: any
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
    this.getSlides('/sample-page')
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
