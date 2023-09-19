<template>
  <div class="wa-chat-container">
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
import type { Chat } from '@/types'
import { computed, defineComponent } from 'vue'
import Bubble from '@/components/base/Bubble.vue'

export default defineComponent({
  name: 'history',

  props: {
    history: {
      type: Array as PropType<Chat[]>,
      required: false,
      default: () => []
    }
  },

  components: {
    Bubble
  },

  setup(props) {
    const classes = computed(() => ({
      'wa-avatar-container': true
    }))

    const chats = computed(() =>
      props.history
        .map((chat) => {
          return {
            uuid: chat.message.uuid,
            sent: chat.user.uuid === '00001',
            message: chat.message.content,
            time: format(chat.message.sent, 'HH:mm')
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

    return {
      chats,
      classes
    }
  }
})
</script>

<style lang="scss" src="./history.scss"></style>
