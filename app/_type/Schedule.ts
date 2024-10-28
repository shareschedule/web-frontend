import { stringOrDate } from 'react-big-calendar'

export type Schedule = {
  id: number
  calendarId: number
  userId: number
  title: string
  isAllday: boolean
  startDatetime: stringOrDate
  endDatetime: stringOrDate
  content: string
  location: string
  createdAt: stringOrDate
  modifiedAt: stringOrDate
}

export type CreateScheduleRequest = {
  title: string
  isAllday: boolean
  startDatetime: stringOrDate
  endDatetime: stringOrDate
  content?: string
  location?: string
}
