<template>
  <div class="wa-empty">
    <img alt="chat empty" class="wa-empty-image" :src="chatEmptyImg" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import chatEmpty from '@/assets/chat_empty.png'

export default defineComponent({
  name: 'empty',

  setup() {
    const chatEmptyImg = chatEmpty
    return { chatEmptyImg }
  }
})
</script>

<style lang="scss" src="./empty.scss"></style>
