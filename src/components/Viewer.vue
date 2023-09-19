<template>
  <Header>
    <template #left>
      <Avatar :src="contactImg"></Avatar>
      <h4>{{ contactName }}</h4>
    </template>
    <template #right>
      <Icon name="search"></Icon>
      <Icon name="menu"></Icon>
    </template>
  </Header>
  <History :history="chats"></History>
  <Composer></Composer>
</template>

<script lang="ts">
import { useState } from '@/state'
import { computed, defineComponent } from 'vue'
import Icon from '@/components/base/Icon.vue'
import Avatar from '@/components/base/Avatar.vue'
import Header from '@/components/base/Header.vue'
import History from '@/components/chat/History.vue'
import Composer from '@/components/chat/Composer.vue'

export default defineComponent({
  name: 'viewer',
  components: {
    Icon,
    Header,
    Avatar,
    History,
    Composer
  },
  setup() {
    const { chats, contacts, activeContact } = useState()

    const contactName = computed(() => {
      if (activeContact.value > -1) {
        const contact = contacts.value[activeContact.value]
        return `${contact.user.firstName} ${contact.user.lastName}`
      }
      return ''
    })

    const contactImg = computed(() => {
      if (activeContact.value > -1) {
        return contacts.value[activeContact.value].user.profileImg
      }
      return ''
    })

    return {
      chats,
      contactImg,
      contactName
    }
  }
})
</script>
