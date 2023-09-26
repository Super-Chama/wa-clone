// very basic global store
// only for demo

import { reactive, readonly, toRefs } from 'vue'
import type { Contact, Message } from '@/types'

interface State {
  contacts: Contact[]
  messages: Message[]
  currentUser: Contact | null
  activeContact: string | null
}

const state = reactive<State>({
  contacts: [],
  messages: [],
  currentUser: null,
  activeContact: null
})

export function useStore() {
  const setState = (key: keyof typeof state, value: any) => {
    state[key] = value
  }

  return {
    setState,
    ...toRefs(readonly<State>(state))
  }
}
