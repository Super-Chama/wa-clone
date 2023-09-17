<template>
  <Header>
    <template #left>
      <Avatar></Avatar>
    </template>
    <template #right>
      <Icon name="search"></Icon>
      <Icon name="menu"></Icon>
    </template>
  </Header>
  <Chat :history="history"></Chat>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Chat from '@/components/Chat.vue'
import Icon from '@/components/base/Icon.vue'
import Avatar from '@/components/base/Avatar.vue'
import Header from '@/components/base/Header.vue'

export default defineComponent({
  name: 'viewer',
  components: {
    Icon,
    Chat,
    Header,
    Avatar
  },
  data() {
    return {
      history: Array(5)
        .fill(null)
        .map(() => ({
          user: {
            uuid: Math.random() > 0.5 ? '32323' : '00001',
            firstName: 'Jason',
            lastName: 'Bourne',
            username: 'jason',
            profileImg: ''
          },
          message: {
            uuid: '32323',
            content: 'Hello World!',
            sent: new Date().valueOf()
          }
        }))
    }
  }
})
</script>
