<script lang="ts">
import type { Component } from 'vue'
import { h, computed, defineComponent, defineAsyncComponent } from 'vue'

export default defineComponent({
  name: 'icon',
  props: {
    name: {
      type: String,
      required: true
    },
    border: {
      type: Boolean,
      required: false,
      default: false
    },
    background: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  setup(props) {
    const svgs = import.meta.glob('@/assets/*.svg')

    const icon = computed(
      () => Object.keys(svgs).find((file) => file.split('/').pop() === `${props.name}.svg`) ?? ''
    )

    return () =>
      h(
        'i',
        {
          class: {
            'wa-icon': true,
            '--border': props.border,
            '--background': props.background
          }
        },
        h(defineAsyncComponent(() => svgs[icon.value]() as Promise<Component>))
      )
  }
})
</script>

<style lang="scss" src="./icon.scss"></style>
