<template>
  <div class="wa-splash">
    <Icon class="wa-splash-icon" name="whatsapp"></Icon>

    <template v-if="loading">
      <div class="wa-splash-loader"></div>
      <h3 class="wa-splash-brandname">WhatzApp</h3>
      <p class="wa-splash-tagline">It's not end-to-end encrypted!</p>
    </template>

    <slot v-else></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Icon from '@/components/base/Icon.vue'

export default defineComponent({
  name: 'splash',

  props: {
    loading: {
      type: Boolean,
      default: true,
    }
  },

  components: {
    Icon
  },
})
</script>

<style lang="scss" src="./splash.scss"></style>
