// very basic global store
// only for demo

import { reactive, toRefs } from 'vue'
import type { User, Chat, Contact } from '@/types'

interface State {
  chats: Chat[]
  contacts: Contact[]
  activeContact: number
  currentUser: User | null;
}

const state = reactive<State>({
  chats: [],
  contacts: [],
  activeContact: -1,
  currentUser: null,
})

export function useStore() {
  const setState = (key: keyof typeof state, value: any) => {
    state[key] = value
  }

  return {
    setState,
    ...toRefs(state)
  }
}
