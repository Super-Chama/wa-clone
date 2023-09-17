<template>
  <div :class="classes">
    <div class="wa-chat-bubble-message">
      {{ message }}
    </div>
    <div class="wa-chat-bubble-time">
      {{ time }}
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent({
  name: 'bubble',

  props: {
    message: {
      type: String,
      required: true
    },
    time: {
      type: String,
      required: true
    },
    sent: {
      type: Boolean,
      required: true
    }
  },

  setup(props) {
    const classes = computed(() => ({
      'wa-chat-bubble': true,
      '--white': !props.sent,
      '--green': props.sent,
    }))

    return {
      classes
    }
  }
})
</script>

<style lang="scss" src="./bubble.scss"></style>
