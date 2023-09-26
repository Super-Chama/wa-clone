<template>
  <Header>
    <template #left>
      <Avatar :src="currentUser && currentUser.profileImg"></Avatar>
    </template>
    <template #right>
      <Icon name="status"></Icon>
      <Icon name="message"></Icon>
      <Icon name="menu"></Icon>
    </template>
  </Header>
  <Search v-model="searchKeyword"></Search>
  <Drawer
    :list="list"
    :history="history"
    :activeContact="activeContact"
    :uuid="currentUser && currentUser.uuid"
    @selectContact="onSelectContact"
  ></Drawer>
</template>

<script lang="ts">
import { useStore } from '@/store'
import { computed, defineComponent, ref } from 'vue'
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
    const searchKeyword = ref('')

    const { contacts, messages, currentUser, activeContact, setState } = useStore()

    const history = computed(() => messages.value.map((msg) => msg))

    const list = computed(() => {
      const filter = new RegExp(searchKeyword.value, 'i') // very simple filter
      return contacts.value.filter(
        (contact) =>
          (contact.uuid !== currentUser.value?.uuid &&
            (contact.firstName.match(filter) || contact.lastName.match(filter))) ||
          contact.uuid === activeContact.value // filter shouldnt affect selected contact
      )
    })

    const onSelectContact = (uuid: string) => {
      setState('activeContact', uuid)
    }

    return {
      list,
      history,
      currentUser,
      activeContact,
      searchKeyword,
      onSelectContact
    }
  }
})
</script>
