<template>
    <header class="wa-header-container">
      <div class="wa-header-left">
        <slot name="left"></slot>
      </div>
      <div class="wa-header-right">
        <slot name="right"></slot>
      </div>
    </header>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'headerr'
  })
  </script>
  
  <style lang="scss" src="./header.scss"></style>