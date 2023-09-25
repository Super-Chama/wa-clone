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
  <Drawer :list="contacts"></Drawer>
</template>

<script lang="ts">
import { useStore } from '@/store'
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
  setup() {
    const { contacts } = useStore()

    return {
      contacts
    }
  }
})
</script>
