<template>
  <Layout>
    <template #navigator>
      <Navigator></Navigator>
    </template>
    <template #body>
      <Viewer></Viewer>
    </template>
  </Layout>
</template>

<script lang="ts">
import Viewer from '@/components/Viewer.vue'
import Navigator from '@/components/Navigator.vue'
import Layout from '@/components/base/Layout.vue'

import { defineComponent } from 'vue'

export default defineComponent({
  name: 'app',

  components: {
    Layout,
    Viewer,
    Navigator
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
