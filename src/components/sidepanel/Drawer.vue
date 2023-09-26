<template>
  <div class="wa-drawer-container">
    <div
      v-for="contact in contacts"
      :key="contact.uuid"
      :class="{
        'wa-drawer-card': true,
        '--selected': activeContact === contact.uuid
      }"
      @click="$emit('selectContact', contact.uuid)"
    >
      <div class="wa-drawer-card-left">
        <Avatar size="medium" :src="contact.imgSrc"></Avatar>
        <div class="wa-drawer-card-title">
          <h4>{{ contact.fullName }}</h4>
          <template v-if="contact.hasLastIm">
            <span>{{ contact.lastIm }}</span>
            <span>{{ contact.lastImStatus }}</span>
          </template>
        </div>
      </div>
      <div v-if="contact.hasLastIm" class="wa-drawer-card-right">
        <p class="wa-drawer-card-time">{{ contact.lastImTime }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue'
import { formatDistance } from 'date-fns'
import { computed, defineComponent } from 'vue'
import type { Contact, Message } from '@/types'
import Avatar from '@/components/base/Avatar.vue'

export default defineComponent({
  name: 'drawer',

  props: {
    uuid: {
      type: [String, null] as PropType<string | null>,
      required: false,
      default: null
    },
    activeContact: {
      type: [String, null] as PropType<string | null>,
      required: false,
      default: null
    },
    list: {
      type: Array as PropType<Contact[]>,
      required: false,
      default: () => []
    },
    history: {
      type: Array as PropType<Message[]>,
      required: false,
      default: () => []
    }
  },

  emits: ['selectContact'],

  components: {
    Avatar
  },

  setup(props) {
    const contacts = computed(() =>
      props.list.map((contact) => {
        const message = props.history
          .filter(
            (message) =>
              (message.sender_uuid === contact.uuid || message.sender_uuid === props.uuid) &&
              (message.receiver_uuid === contact.uuid || message.receiver_uuid === props.uuid)
          )
          .pop()

        return {
          uuid: contact.uuid,
          imgSrc: contact.profileImg,
          fullName: `${contact.firstName} ${contact.lastName}` || contact.username,
          hasLastIm: !!message,
          lastIm: (message?.content || '').substring(0, 25).trim() + '...',
          lastImStatus: message?.read,
          lastImTime: formatDistance(message?.sent || 0, new Date(), {
            addSuffix: true,
            includeSeconds: false
          })
        }
      })
    )

    return {
      contacts
    }
  }
})
</script>

<style lang="scss" src="./drawer.scss"></style>
