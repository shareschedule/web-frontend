import { stringOrDate } from 'react-big-calendar'

export type Calendar = {
  id: number
  isPublic: boolean
  title: string
  content: string
  image: string
  createdBy: number
  createdAt: stringOrDate
  modifiedAt: stringOrDate
  isDeleted: boolean
}

export type CreateCalendarRequest = {
  isPublic: boolean
  title: string
  content: string
}
