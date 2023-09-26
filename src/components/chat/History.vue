<template>
  <div ref="scrollerDiv" class="wa-chat-container">
    <div v-for="group in chats" :key="group.toString()" class="wa-chat-group">
      <Bubble
        v-for="chat in group"
        :sent="chat.sent"
        :key="chat.uuid"
        :time="chat.time"
        :message="chat.message"
      ></Bubble>
    </div>
  </div>
</template>

<script lang="ts">
import { format } from 'date-fns'
import type { PropType } from 'vue'
import type { Message } from '@/types'
import Bubble from '@/components/base/Bubble.vue'
import { computed, defineComponent, nextTick, ref, watch } from 'vue'

export default defineComponent({
  name: 'history',

  props: {
    uuid: {
      type: [String, null] as PropType<string | null>,
      required: false,
      default: null
    },
    history: {
      type: Array as PropType<Message[]>,
      required: false,
      default: () => []
    }
  },

  components: {
    Bubble
  },

  setup(props) {
    const scrollerDiv = ref<HTMLDivElement>()

    const classes = computed(() => ({
      'wa-avatar-container': true
    }))

    const chats = computed(() =>
      props.history
        .map((message) => {
          return {
            uuid: message.uuid,
            message: message.content,
            sent: message.sender_uuid === props.uuid,
            time: format(message.sent, 'HH:mm')
          }
        })
        .reduce(
          (prev, curr) => {
            if (prev.length && curr.sent === prev[prev.length - 1][0].sent) {
              prev[prev.length - 1].push(curr)
            } else {
              prev.push([curr])
            }
            return prev
          },
          [] as Array<
            {
              uuid: string
              sent: boolean
              message: string
              time: string
            }[]
          >
        )
    )

    watch(
      chats,
      async () => {
        await nextTick()
        const div = scrollerDiv.value!
        div.scrollTo({ top: div.scrollHeight })
      },
      { immediate: true }
    )

    return {
      chats,
      classes,
      scrollerDiv
    }
  }
})
</script>

<style lang="scss" src="./history.scss"></style>
