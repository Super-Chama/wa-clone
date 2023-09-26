<template>
  <div class="wa-search-container">
    <Icon class="wa-search-icon" name="search"></Icon>
    <input
      class="wa-search-input"
      placeholder="Search or start a new chat"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Icon from '@/components/base/Icon.vue'

export default defineComponent({
  name: 'search',

  props: {
    modelValue: {
      type: String,
      required: true
    }
  },

  emits: ['update:modelValue'],

  components: {
    Icon
  }
})
</script>

<style lang="scss" src="./search.scss"></style>
