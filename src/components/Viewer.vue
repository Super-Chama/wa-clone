<template>
  <template v-if="activeContact">
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
    <History
      :key="activeContact"
      :history="history"
      :uuid="currentUser && currentUser.uuid"
    ></History>
    <Composer @sendMessage="onSendMessage"></Composer>
  </template>
  <Empty v-else></Empty>
</template>

<script lang="ts">
import { useStore } from '@/store'
import { useDatabase } from 'vuefire'
import { saveMessage } from '@/database'
import { computed, defineComponent } from 'vue'
import Icon from '@/components/base/Icon.vue'
import Empty from '@/components/base/Empty.vue'
import Avatar from '@/components/base/Avatar.vue'
import Header from '@/components/base/Header.vue'
import History from '@/components/chat/History.vue'
import Composer from '@/components/chat/Composer.vue'

export default defineComponent({
  name: 'viewer',

  components: {
    Icon,
    Empty,
    Header,
    Avatar,
    History,
    Composer
  },

  setup() {
    const db = useDatabase()
    const { contacts, messages, activeContact, currentUser } = useStore()

    const contact = computed(() =>
      contacts.value.find((contact) => contact.uuid === activeContact.value)
    )

    const contactImg = computed(() => {
      return contact.value ? contact.value.profileImg : ''
    })

    const contactName = computed(() => {
      return contact.value ? `${contact.value.firstName} ${contact.value.lastName}` : ''
    })

    const history = computed(() =>
      messages.value.filter(
        (message) =>
          (message.sender_uuid === activeContact.value ||
            message.sender_uuid === currentUser.value?.uuid) &&
          (message.receiver_uuid === currentUser.value?.uuid ||
            message.receiver_uuid === activeContact.value)
      )
    )

    const onSendMessage = (message: string) => {
      saveMessage(db, {
        content: message,
        receiver_uuid: activeContact.value!,
        sender_uuid: currentUser.value?.uuid
      })
    }

    return {
      history,
      contactImg,
      contactName,
      currentUser,
      activeContact,
      onSendMessage
    }
  }
})
</script>
