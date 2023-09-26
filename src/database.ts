import {
  get,
  set,
  ref,
  query,
  onChildAdded,
  orderByChild,
  serverTimestamp
} from 'firebase/database'
import type { Contact, Message } from './types'
import type { Database } from 'firebase/database'

export async function read<T>(
  db: Database,
  entity: string,
  orderField = 'uuid'
): Promise<T | null> {
  const snapshot = await get(query(ref(db, entity), orderByChild(orderField)))

  if (snapshot.exists()) {
    const values: Record<string, T> = {}
    snapshot.forEach((child) => {
      values[child.key] = child.val()
    })
    return values as T
  }

  return null
}

export async function write(db: Database, entity: string, payload: Record<string, any>) {
  if (payload.uuid) entity += `/${payload.uuid}`
  await set(ref(db, entity), payload)
}

export async function saveMessage(db: Database, message: Partial<Message>) {
  await write(db, 'messages', {
    content: message.content,
    sender_uuid: message.sender_uuid,
    receiver_uuid: message.receiver_uuid,
    uuid: window.crypto.randomUUID(),
    sent: serverTimestamp()
  })
}

export async function saveContact(db: Database, contact: Partial<Contact>) {
  const snapshot = await get(ref(db, `contacts/${contact.uuid}`))
  if (snapshot.exists()) return // no need to save this contact

  await write(db, 'contacts', {
    lastName: contact.lastName,
    username: contact.username,
    firstName: contact.firstName,
    profileImg: contact.profileImg,
    uuid: contact.uuid ?? window.crypto.randomUUID()
  })
}

export function listenMessages(db: Database, callback: (message: Message) => void) {
  const messagesRef = ref(db, 'messages')
  return onChildAdded(messagesRef, (data) => {
    callback({
      sent: data.val().sent,
      uuid: data.val().uuid,
      read: data.val().read,
      content: data.val().content,
      delivered: data.val().delivered,
      sender_uuid: data.val().sender_uuid,
      receiver_uuid: data.val().receiver_uuid
    })
  })
}

export function listenContacts(db: Database, callback: (contact: Contact) => void) {
  const contactsRef = ref(db, 'contacts')
  return onChildAdded(contactsRef, (data) => {
    callback({
      uuid: data.val().uuid,
      lastName: data.val().lastName,
      username: data.val().username,
      firstName: data.val().firstName,
      profileImg: data.val().profileImg
    })
  })
}
