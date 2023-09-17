<template>
  <div :class="wrapperClasses">
    <img alt="user avatar" :class="imgClasses" :src="imgSrc" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import defaultAvatar from '@/assets/blank-profile-picture.png'

const SIZE_SMALL = 'small'
const SIZE_MEDIUM = 'medium'
const SIZE_LARGE = 'large'

const SIZE_MAP = {
  [SIZE_SMALL]: '--small',
  [SIZE_LARGE]: '--large',
  [SIZE_MEDIUM]: '--medium'
}

export default defineComponent({
  name: 'avatar',

  props: {
    src: {
      type: String,
      required: false,
      default: null
    },
    border: {
      type: Boolean,
      required: false,
      default: false
    },
    size: {
      type: String,
      required: false,
      default: SIZE_SMALL,
      validator: function (value: string) {
        return Object.keys(SIZE_MAP).indexOf(value) !== -1
      }
    }
  },

  setup(props) {
    const imgClasses = computed(() => ({
      'wa-avatar-image': true,
      [SIZE_MAP[props.size as keyof typeof SIZE_MAP]]: true
    }))

    const wrapperClasses = computed(() => ({
      'wa-avatar-container': true
    }))

    const imgSrc = computed(() => props.src || defaultAvatar)

    return {
      imgSrc,
      imgClasses,
      wrapperClasses
    }
  }
})
</script>

<style lang="scss" src="./avatar.scss"></style>
