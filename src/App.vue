<template>
  <div class="wa-app">
    <Layout></Layout>
  </div>
</template>

<script lang="ts">
import Layout from '@/components/Layout.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'app',

  components: {
    Layout
  }
})
</script>

<style lang="scss">
html,
body {
  display: block;
  box-sizing: border-box;
  font-size: $base-font-size;
  font-family: $base-font-family;
}
</style>
