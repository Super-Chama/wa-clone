<template>
  <div class="wa-search-container">
    <Icon class="wa-search-icon" name="search"></Icon>
    <input class="wa-search-input" placeholder="Search or start a new chat" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Icon from '@/components/base/Icon.vue'

export default defineComponent({
  name: 'search',

  components: {
    Icon
  }
})
</script>

<style lang="scss" src="./search.scss"></style>
