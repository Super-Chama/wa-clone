export interface Contact {
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
  sender_uuid: string
  receiver_uuid: string
}
