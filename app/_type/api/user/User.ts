import { stringOrDate } from 'react-big-calendar'

export type User = {
  recentCalendarId: number
  nickname: string
  method: string
  image: number[]
  registeredAt: stringOrDate
  modifiedAt: stringOrDate
}
