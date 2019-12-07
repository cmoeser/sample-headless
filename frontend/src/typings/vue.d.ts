import Vue, { ComponentOptions } from 'vue'
import VueRouter from 'vue-router'
import { Store } from 'vuex'
import { match } from 'minimatch'
import { any } from 'async'

declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

declare global {
  interface Window {
    ga: any
    onscroll: any
  }
}

declare module 'vue/types' {
  export interface IParams {
    [index: string]: any
  }
  export interface RedirectHandle {
    (status: number, path: string, query?: string): void
    (path: string, query?: string): void
  }

  export interface NuxtContext {
    isClient: boolean
    isServer: boolean
    isDev: boolean
    route: VueRouter
    store: Store<any>
    env: object
    params: IParams
    query: object
    req?: Request
    res?: Response
    redirect: RedirectHandle
    error: (params: IParams) => void
  }

  export interface PageData {
    fieldPanels?: Array<any>
  }

  interface Vue {
    $nuxt: object
    $router: VueRouter
    $apollo: object

    //validate(params: Vue.NuxtContext): boolean
    // asyncData(context: Vue.NuxtContext): Promise<any>

    apollo: object
  }
}
export interface Process {
  client?: any
}
export interface VueClass {
  Component: object
}
export interface component {
  key: object
}
declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    $el?: HTMLElement
    $store?: Store<any>
  }
}

export interface error {
  statusCode?: string | number
  message?: string
  type: Object
  default: null
}
export interface RootState {
  version: string
}

export interface alias {
  alias?: string
}
export interface website {
  label?: string
  url?: alias
}

export interface AppState {
  menuMobileIsOpened?: boolean
  baseURL: string
  appColors: object
}

export interface Recaptcha {
  getResponse: () => {}
  reset: () => {}
}

export interface ClientLogo {
  title: string
  fieldLogo: {
    entity: {
      url: string
    }
  }
}

export interface ClientsState {
  clientLogos: ClientLogo[]
}

export interface FPOptions {
  licenseKey?: string
  //Navigation
  menu?: string
  lockAnchors?: boolean
  anchors?: Array<string>
  navigation?: boolean
  navigationPosition?: string
  navigationTooltips?: Array<string>
  showActiveTooltip?: boolean
  slidesNavigation?: boolean
  slidesNavPosition?: string

  //Scrolling
  css3?: true
  scrollingSpeed?: boolean
  autoScrolling?: boolean | undefined
  fitToSection?: boolean
  fitToSectionDelay?: number
  scrollBar?: boolean
  easing?: string
  easingcss3?: string
  loopBottom?: boolean
  loopTop?: boolean
  loopHorizontal?: boolean
  continuousVertical?: boolean
  continuousHorizontal?: boolean
  scrollHorizontally?: boolean
  interlockedSlides?: boolean
  dragAndMove?: boolean
  offsetSections?: boolean
  resetSliders?: boolean
  fadingEffect?: boolean
  normalScrollElements?: string
  scrollOverflow?: boolean
  scrollOverflowReset?: boolean
  scrollOverflowOptions?: null
  touchSensitivity?: number
  normalScrollElementTouchThreshold?: number
  bigSectionsDestination?: null

  //Accessibility
  keyboardScrolling?: boolean
  animateAnchor?: boolean
  recordHistory?: boolean

  //Design
  controlArrows?: boolean
  verticalCentered?: boolean
  sectionsColor?: Array<string | undefined>
  paddingTop?: string
  paddingBottom?: string
  fixedElements?: string
  responsiveWidth?: number
  responsiveHeight?: number
  responsiveSlides?: boolean
  parallax?: boolean
  parallaxOptions?: object

  //Custom selectors
  sectionSelector?: string
  slideSelector?: string

  // Functions
  onSlideLeave?: (section: object, origin: object, destination, direction: string) => void
  afterRender?: (section: object, origin: object, destination, direction: string) => void
  onLeave?: (section: object, origin: object, destination, direction: string) => void
  afterLoad?: (section: object, origin: object, destination, direction: string) => void

  lazyLoading?: boolean
}
//match<Function>(regexp: RegExp): RegExpMatchArray;
export interface Color {
  match(regexp: RegExp): RegExpMatchArray
  slice(n: Number): string
  length: Number
}

export interface SlidesState {
  slideTone: string
  slideColor: string
  fpOptions: FPOptions
}

export interface AppColors {
  innRed?: string
}

export interface MetaObject {
  lakePlacid?: {
    title?: string
    description?: string
    canonical?: string
    ogUrl?: string
  }
  saratoga?: {
    title?: string
    description?: string
    canonical?: string
    ogUrl?: string
  }
  defaultContact?: {
    title?: string
    description?: string
    canonical?: string
    ogUrl?: string
  }
}

export interface KeyValue {
  key: string
  value: string
  __typename: string
}

export interface EntityMetaTags {
  entityMetatags: Array<KeyValue>
}
export interface Results {
  results: EntityMetaTags
}

export interface MetaResponseObject {
  pageGqlView: Results
}
export interface APIResponse {
  data: { token: string }
}
