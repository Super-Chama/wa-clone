// very basic state management
// only for demo

import { reactive, toRefs } from 'vue'
import { faker } from '@/faker'
import type { Chat, Contact } from '@/types'

interface State {
  chats: Chat[]
  contacts: Contact[]
  activeContact: number
}

const state = reactive<State>({
  chats: [],
  contacts: [],
  activeContact: -1
})

export function useState() {
  const setState = (key: keyof typeof state, value: any) => {
    state[key] = value
  }

  const seedState = () => {
    const contactMe = {
      uuid: '00001',
      profileImg: faker.internet.image(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      username: '@' + faker.name.firstName().toLowerCase()
    }
    state.activeContact = 0
    state.contacts = Array(25)
      .fill(null)
      .map(() => ({
        user: {
          uuid: faker.uuid.random(),
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          username: '@' + faker.name.firstName().toLowerCase(),
          profileImg: faker.internet.image()
        },
        lastIm: {
          sent: faker.date.past(),
          uuid: faker.uuid.random(),
          content: faker.message.random()
        }
      }))
    state.chats = Array(50)
      .fill(null)
      .map(() => ({
        user: {
          ...(Math.random() > 0.5 ? contactMe : state.contacts[0].user)
        },
        message: {
          sent: faker.time.past(),
          uuid: faker.uuid.random(),
          content: faker.message.random()
        }
      }))
  }

  return {
    ...toRefs(state),
    setState,
    seedState
  }
}
