import Vue from 'vue'
import Component from 'vue-class-component'
import { mutationTypes } from '../store/mutation-types'
import { State, Mutation } from 'vuex-class'
import { StateBindingHelper } from 'vuex-class/lib/bindings'

// Custom Typings
import { FPOptions, AppColors } from '../typings/vue'

/**
 *  @name - BaseSlide
 *
 *  @desc - Base Class for inherting base functionality
 *
 *  @author - Chip Moeser 
 *
 *  Wed Nov 20 20:59:12 EST 2019
 */
@Component({
  head() {
    return {
      title: this.pageMeta.entityMetatags.find(key => key.key === 'title').value,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.pageMeta.entityMetatags.find(key => key.key === 'description').value
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: this.pageMeta.entityMetatags.find(key => key.key === 'og:image:url').value
        },
        {
          hid: 'og:image:width',
          property: 'og:image:width',
          content: this.pageMeta.entityMetatags.find(key => key.key === 'og:image:width').value
        },
        {
          hid: 'og:image:height',
          property: 'og:image:height',
          content: this.pageMeta.entityMetatags.find(key => key.key === 'og:image:height').value
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.pageMeta.entityMetatags.find(key => key.key === 'og:title').value
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: this.pageMeta.entityMetatags.find(key => key.key === 'og:url').value
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.pageMeta.entityMetatags.find(key => key.key === 'og:description').value
        }
      ],
      link: [
        {
          rel: 'canonical',
          href: this.pageMeta.entityMetatags.find(key => key.key === 'canonical').value
        }
      ]
    }
  },
  middleware: 'meta'
})
export default class BaseSlide extends Vue {
  /* pageMeta
   * @descrition - Page meta tags
   * @decorator - @State
   * @name - slideColor: StateBindingHelper
   * @type - Sate<T>
   * @param - namespace: string - appState
  */
  @State('pageMeta', { namespace: 'appState' })
  pageMeta: any
  /*
   * fpOptions
   * @descrition - Binds to the fpOptions object in the slidesState state
   * @decorator - @State
   * @name - slidesState
   * @type - Sate<T>
   * @arguments - namespace
  */
  @State('fpOptions', { namespace: 'slidesState' })
  fpOptions: FPOptions
  /*
   * @descrition - Binds to the slideTone object in the slidesState state. light/dark
   * @decorator - @State
   * @name - slideTone
   * @type - Sate<T>
   * @arguments - namespace - slidesState
  */
  @State('slideTone', { namespace: 'slidesState' })
  slideTone: StateBindingHelper
  /* slideColor
   * @descrition - Binds to the slideTone object in the slidesState state
   * @decorator - @State
   * @name - slideColor: StateBindingHelper
   * @type - Sate<T>
   * @param - namespace: string - slidesState
  */
  @State('slideColor', { namespace: 'slidesState' })
  slideColor: StateBindingHelper

  /*
   * appColors
   * @descrition - Binds to the appColors object in the appState state
   * @decorator - @State
   * @name - appState
   * @type - Sate<T>
   * @arguments - namespace
  */
  @State('appColors', { namespace: 'appState' })
  appColors: AppColors


  /* SET_SLIDE_COLOR
   * @descrition - Sets the open/closed state of the mobile menu
   * @decorator - @Mutation
   * @name - SET_SLIDE_COLOR: Function
   * @type - Sate<T>
   * @param - namespace: string - slidesState
  */
  @Mutation(mutationTypes.SET_SLIDE_COLOR, { namespace: 'slidesState' })
  setSlideColor: (slideColor: string) => void

  /*
   * SET_SLIDE_CONFIG
   * @descrition - Sets the slide config object in the slidesState state with local slide overrides
   * @decorator - @State
   * @name - setSlideConfig
   * @type - Mutation<T>
   * @arguments - namespace - slidesState
  */
  @Mutation(mutationTypes.SET_SLIDE_CONFIG, { namespace: 'slidesState' })
  setSlideConfig: (localOptions: FPOptions) => Promise<any>

  /*
   * localOptions

   * @descrition - Local slide options. Usually colors and scrolling overrrides from base options

   * @type - FPOptions
  */
  protected localOptions: FPOptions = {}
}
