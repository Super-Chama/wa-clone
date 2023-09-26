<template>
  <Layout v-if="!isLoading && currentUser">
    <template #navigator>
      <Navigator></Navigator>
    </template>
    <template #body>
      <Viewer></Viewer>
    </template>
  </Layout>
  <Splash :loading="isLoading" v-else>
    <button @click="triggerSignIn">SignIn with Google</button>
    <p v-show="loginError">{{ loginError }}</p>
  </Splash>
</template>

<script lang="ts">
import { useStore } from '@/store'
import type { Contact, Message } from './types'
import Viewer from '@/components/Viewer.vue'
import Navigator from '@/components/Navigator.vue'
import Layout from '@/components/base/Layout.vue'
import Splash from '@/components/base/Splash.vue'
import { googleSignin, listenAuthState } from './auth'
import { useDatabase, useFirebaseAuth } from 'vuefire'
import { defineComponent, onUnmounted, watchEffect, ref } from 'vue'
import { listenContacts, listenMessages, read, saveContact } from './database'

export default defineComponent({
  name: 'app',

  components: {
    Layout,
    Viewer,
    Splash,
    Navigator
  },

  setup() {
    const db = useDatabase()
    const loginError = ref('')
    const isLoading = ref(false)
    const auth = useFirebaseAuth()!
    const { messages, contacts, currentUser, setState } = useStore()

    const triggerSignIn = async () => {
      const response = await googleSignin(auth)
      if (typeof response === 'string') {
        loginError.value = response
      } else {
        saveContact(db, response)
      }
    }

    /**
     * Bulk load contacts/messages when user is authenticated
     */
    watchEffect(async () => {
      if (currentUser.value) {
        isLoading.value = true
        const contacts = await read<Record<string, Contact>>(db, 'contacts')
        const messages = await read<Record<string, Message>>(db, 'messages', 'sent')

        if (contacts) setState('contacts', Object.values(contacts))
        if (messages) setState('messages', Object.values(messages))

        isLoading.value = false
      }
    })

    /**
     * Setup listners for realtime updates
     */
    const authStateUnsubscribe = listenAuthState(auth, (user) => {
      setState('currentUser', user)
    })

    const messageUnsubscribe = listenMessages(db, (message) => {
      setState('messages', [...messages.value, message])
    })

    const contactsUnsubscribe = listenContacts(db, (contact) => {
      setState('contacts', [...contacts.value, contact])
    })

    onUnmounted(() => {
      messageUnsubscribe()
      contactsUnsubscribe()
      authStateUnsubscribe()
    })

    return {
      isLoading,
      loginError,
      currentUser,
      triggerSignIn
    }
  }
})
</script>

<style lang="scss">
html,
body {
  display: block;
  box-sizing: border-box;
  font-size: $base-font-size;
  font-family: $base-font-family;
}
</style>
