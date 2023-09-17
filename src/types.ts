export interface User {
  uuid: string
  firstName: string
  lastName: string
  username: string
  profileImg: string
}

export interface Message {
  uuid: string
  content: string
  sent: number
  read?: number
  delivered?: number
}

export interface Contact {
  user: User
  lastIm: Message | null
}

export interface Chat {
  user: User
  message: Message
}
