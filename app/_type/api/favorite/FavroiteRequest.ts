import { stringOrDate } from 'react-big-calendar'

export type FavoriteRequest = {
  scheduleId: number
  calendarId: number
  isAllday: boolean
  scheduleStartDatetime: stringOrDate
  scheduleEndDatetime: stringOrDate
}

export type FavoriteRequestForBulkDelete = {
  list: []
}
