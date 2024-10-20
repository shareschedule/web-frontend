import { stringOrDate } from 'react-big-calendar'

export type UserResponse = {
  id: number
  recentCalendarId: number
  nickname: string
  method: string
  image: []
  registeredAt: stringOrDate
  modifiedAt: stringOrDate
}
