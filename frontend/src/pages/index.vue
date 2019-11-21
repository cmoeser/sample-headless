<template>
  <div class="home">
    <no-ssr>
      <full-page :options="fpOptions">
        <section role="region" class="section" data-tone="dark">
        </section>
      </full-page>
    </no-ssr>
    <no-ssr>
    </no-ssr>
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
// Utils
import BaseSlide from '../mixins/BaseSlide'
// Components
import SimplePanel from '../components/SimplePanel.vue'

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

@Component({
  components: {
    SimplePanel
  }
})
export default class WKSSlide extends Mixins(BaseSlide) {
  protected simplePanels: Array<any> = []


  protected created(): void {
    // Local options declared in BaseSlide
    this.localOptions = {
      sectionsColor: [
        this.appColors.midnightBlue,
        this.appColors.innovativeRed,
        this.appColors.coolSlate,
        this.appColors.white,
        this.appColors.midnightBlue,
        this.appColors.midnightBlue
      ],


      afterLoad: this.panelAfterLoad,
      navigation: true,
      scrollBar: false,
      autoScrolling: true,
      fitToSection: true,
      fitToSectionDelay: 500
    }


    this.setSlideConfig(this.localOptions)
  }

  protected mounted(): void {
    // When leaving and renetring need to set the menu to light.
    // this.setSlideTone('dark')
  }

  protected panelAfterLoad(origin, destination, direction): void {
    this.setSlideColor(destination.item.style.backgroundColor)
  }

}
</script>

<style lang="postcss">

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
