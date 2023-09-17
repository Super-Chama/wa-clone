<template>
  <div class="wa-layout-container">
    <aside class="wa-layout-sidepanel">
      <slot name="navigator"></slot>
    </aside>
    <main class="wa-layout-content">
      <slot name="body"></slot>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'layout'
})
</script>

<style lang="scss" src="./layout.scss"></style>