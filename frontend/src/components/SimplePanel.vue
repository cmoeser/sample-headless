<template>
  <div class="section_content centered team" v-if="panelData">
    <h2 v-html="panelData.fieldHeader.value" />
    <div v-html="panelData.fieldTagLine.value"></div>
    <div>
      <nuxt-link
        :to="panelData.fieldCta[0].url.path"
        class="button"
      >{{ panelData.fieldCta[0].title }}</nuxt-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Prop } from 'nuxt-property-decorator'

/**
 *  WKSSimplePanel
 *  @desc A simple panel with a header, tag line and cta(S).
 *  At this time background images are in the containing page as to support <section> tags for FullPageJS
 *
 *  @author Chip Moeser 
 *
 *  Wed Sep 4 16:25:06 EDT 2019
 */

@Component({})
export default class WKSSimplePanel extends Vue {
  /*
   * @descrition - Panel Data the header, tag line and cta(s) from Drupal simple panel paragraph instance
   * @decorator - @Prop
   * @name - panelData
  */
  @Prop()
  panelData
}
</script>