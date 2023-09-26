<template>
  <div class="wa-composer-container">
    <div class="wa-composer-pre-actions">
      <Icon name="attach"></Icon>
    </div>
    <input
      v-model.trim="message"
      class="wa-composer-input"
      placeholder="Type a message here .."
      @keyup.enter.prevent="onSend"
    />
    <div class="wa-composer-post-actions">
      <Icon name="send" @click="onSend"></Icon>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
import Icon from '@/components/base/Icon.vue'

export default defineComponent({
  name: 'composer',

  components: {
    Icon
  },

  emits: ['sendMessage'],

  setup(_, context) {
    const message = ref(null)

    const onSend = () => {
      if (!message.value) return
      context.emit('sendMessage', message.value)
      message.value = null
    }

    return {
      onSend,
      message,
    }
  }
})
</script>

<style lang="scss" src="./composer.scss"></style>
