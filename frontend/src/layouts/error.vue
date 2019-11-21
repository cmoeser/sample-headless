<template>
  <div>
    <section
      v-scroll="handleScroll"
      role="region"
      class="panel hero error bwhite"
      data-tone="light"
    >
      <div class="panel_content centered panel_column error">
        <div class="error_image">
          <img src="/images/404_error_page.jpg">
        </div>      
        
      </div>
    </section>
  </div>
</template>

<script lang="ts">
/**
 *  @desc Error Page
 *
 *  @author Chip Moeser 
 *
 *  Fri Jun 7 10:06:19 EDT 2019
 */
import { Vue, Component } from 'vue-property-decorator'
import { Mixins } from 'vue-mixin-decorator'
// Utils
import BaseSlide from '../mixins/BaseSlide'
// Components

import error from '../typings/vue'

@Component({
  head() {
    return {
      title: 'Page Not Found | ',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            "This is a error page descirption"
        }
      ],
      link: [
        {
          rel: 'canonical',
          href: 'https://'
        }
      ]
    }
  },
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  components: {
  }
})
export default class WKSSlide extends Mixins(BaseSlide) {
  /**
   * @name - mounted
   *
   * @descrition - Mounted lifecycle hook
   *
   * @type - Array<string | undefined>
   *
   */
  private mounted(): void {
    this.setSlideTone('light')
    this.statusCode()
  }
  /**
   * @name - mounted
   *
   * @descrition - Mounted lifecycle hook
   *
   * @type - Array<string | undefined>
   *
   */
  private statusCode(): string | number {
    return (this.$props.error && this.$props.error.statusCode) || 500
  }
  /**
   * @name - mounted
   *
   * @descrition - Mounted lifecycle hook
   *
   * @type - Array<string | undefined>
   *
   */

  private message(): string {
    return this.$props.error.message || `<%= messages.client_error %>`
  }
}
</script>

<style>
error,
h1.error,
.error_content,
error a {
  color: midnightblue;
}

.error_content {
  margin-bottom: var(--space-xxxl);
}
.error a.nuxt-link-active {
  color: red;
}
.error_image {
  text-align: left;
  width: 100%;
}
.error .panel_content img {
  width: 500px;
}
.__nuxt-error-page {
  padding: 1rem;
  background: #f7f8fb;
  color: #47494e;
  text-align: center;
  display: flex;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  justify-content: center;
  align-items: center;
  -webkit-box-align: center;
  -moz-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  flex-direction: column;
  font-family: sans-serif;
  font-weight: 100 !important;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -webkit-font-smoothing: antialiased;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.__nuxt-error-page .error {
  max-width: 450px;
}
.__nuxt-error-page .title {
  font-size: 1.5rem;
  margin-top: 15px;
  color: #47494e;
  margin-bottom: 8px;
}
.__nuxt-error-page .description {
  color: #7f828b;
  line-height: 21px;
  margin-bottom: 10px;
}
.__nuxt-error-page a {
  color: #7f828b !important;
  text-decoration: none;
}
.__nuxt-error-page .logo {
  position: fixed;
  left: 12px;
  bottom: 12px;
}
</style>
