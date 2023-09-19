<template>
  <div class="wa-composer-container">
    <div class="wa-composer-pre-actions">
      <Icon name="attach"></Icon>
    </div>
    <input class="wa-composer-input" placeholder="Type a message here .." />
    <div class="wa-composer-post-actions">
      <Icon name="send"></Icon>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Icon from '@/components/base/Icon.vue'

export default defineComponent({
  name: 'composer',

  components: {
    Icon
  },
})
</script>

<style lang="scss" src="./composer.scss"></style>
