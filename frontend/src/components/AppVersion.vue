<template>
  <div class="app-version"> {{ packageJson.version }} </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import packageJson from '../../package.json'

/**
 *  App version
 *  @desc Right click on W logo and inspect to get version from package file
 *
 *  @author Chip Moeser 
 *
 *  Wed Sep 4 16:03:01 EDT 2019
 */
@Component({})
export default class extends Vue {
  data() {
    return { packageJson }
  }
}
</script>

<style scoped>
.app-version {
  margin-top: var(--space-md);
  padding-top: var(--space-lg);
  padding-left: var(--space-xs);
  font-size: var(--text-sm);
  letter-spacing: 1px;
  cursor: pointer;
  visibility: hidden;
  position: absolute;
  top: 0;
}
</style>
