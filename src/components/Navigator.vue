<template>
  <Header>
    <template #left>
      <Avatar></Avatar>
    </template>
    <template #right>
      <Icon name="status"></Icon>
      <Icon name="message"></Icon>
      <Icon name="menu"></Icon>
    </template>
  </Header>
  <Search></Search>
  <Drawer :list="list"></Drawer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Icon from '@/components/base/Icon.vue'
import Header from '@/components/base/Header.vue'
import Avatar from '@/components/base/Avatar.vue'
import Search from '@/components/sidepanel/Search.vue'
import Drawer from '@/components/sidepanel/Drawer.vue'

export default defineComponent({
  name: 'navigator',
  components: {
    Icon,
    Header,
    Avatar,
    Search,
    Drawer
  },
  data() {
    return {
      list: Array(5)
        .fill(null)
        .map(() => ({
          user: {
            uuid: '32323',
            firstName: 'Jason',
            lastName: 'Bourne',
            username: 'jason',
            profileImg: ''
          },
          lastIm: {
            uuid: '32323',
            content: 'Hello World!',
            sent: new Date().valueOf()
          }
        }))
    }
  }
})
</script>
