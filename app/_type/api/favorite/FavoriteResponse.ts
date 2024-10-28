import { stringOrDate } from 'react-big-calendar'

export type FavoriteResponse = {
  id: number
  userId: number
  scheduleId: number
  calendarId: number
  isAllday: boolean
  scheduleStartDatetime: stringOrDate
  scheduleEndDatetime: stringOrDate
  createdAt: stringOrDate
}
