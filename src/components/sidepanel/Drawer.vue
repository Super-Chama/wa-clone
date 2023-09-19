<template>
  <div class="wa-drawer-container">
    <div v-for="contact in contacts" class="wa-drawer-card" :key="contact.uuid">
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
import type { Contact } from '@/types'
import { formatDistance } from "date-fns";
import { computed, defineComponent } from 'vue'
import Avatar from '@/components/base/Avatar.vue'

export default defineComponent({
  name: 'drawer',

  props: {
    list: {
      type: Array as PropType<Contact[]>,
      required: false,
      default: () => []
    }
  },

  components: {
    Avatar
  },

  setup(props) {
    const contacts = computed(() =>
      props.list.map((contact) => {
        return {
          uuid: contact.user.uuid,
          imgSrc: contact.user.profileImg,
          fullName: `${contact.user.firstName} ${contact.user.lastName}` || contact.user.username,
          hasLastIm: !!contact.lastIm,
          lastIm: contact.lastIm?.content,
          lastImStatus: contact.lastIm?.read,
          lastImTime: formatDistance(contact.lastIm?.sent || 0, new Date(), {
            addSuffix: true,
            includeSeconds: false
          }),

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
