'use client'

import React, { useCallback, useEffect, useState } from 'react'

import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import { Calendar, momentLocalizer, SlotInfo, stringOrDate } from 'react-big-calendar'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { useModalFormState } from '@/app/_store/calendar/addScheduleModalForm'
import { useGetScheduleList } from '@/app/_hook/schedule/GetSchedule'
import moment from 'moment'
import AddScheduleFormModal from '@/app/_component/Calendar/AddScheduleFormModal'
import { useCurrentCalendarState } from '@/app/_store/calendar/currentCalendar'
import { useUpdateSchedule } from '@/app/_hook/schedule/UpdateSchedule'
import { CreateScheduleRequest } from '@/app/_type/Schedule'
import { useGetUser } from '@/app/_hook/user/GetUser'

moment.locale('ko-KR')
const localizer = momentLocalizer(moment)
const DndCalendar = withDragAndDrop<CalendarDndEvent>(Calendar)

type CalendarDndEvent = {
  start: stringOrDate
  end: stringOrDate
  isAllday: boolean
  title: string
  content?: string
  location?: string
  scheduleId: number
  calendarId: number
}

const CalendarComponent = () => {
  const { dataGetUser, isSuccessGetUser, isLoadingGetUser } = useGetUser()
  const { currentCalendarId, setCurrentCalendarId } = useCurrentCalendarState()
  const { dataScheduleList } = useGetScheduleList(currentCalendarId, 1, 0)
  const { mutateUpdateSchedule } = useUpdateSchedule()
  const [initState, setInitState] = useState<CalendarDndEvent[]>()

  const [date, setDate] = useState(new Date())
  const [view, setView] = useState('month')

  const onNavigate = useCallback((newDate: Date) => setDate(newDate), [setDate])
  const onView = useCallback((newView: string) => setView(newView), [setView])
  const { showModal, setScheduleModalData } = useModalFormState()
  if (isLoadingGetUser) return 'loading'
  useEffect(() => {
    console.log(dataGetUser)
    if (!isLoadingGetUser) setCurrentCalendarId(dataGetUser?.data.data.recentCalendarId ?? 0)
  }, [isSuccessGetUser])
  useEffect(() => {
    console.log(dataScheduleList)
    const calendarItems = dataScheduleList?.data.data.map((item) => {
      return {
        start: moment(item.startDatetime).format('YYYY-MM-DDTHH:mm:sszz'),
        end: moment(item.endDatetime).format('YYYY-MM-DDTHH:mm:sszz'),
        title: item.title,
        scheduleId: item.id,
        calendarId: item.calendarId,
      }
    })
    setInitState(calendarItems)
  }, [currentCalendarId, dataScheduleList])

  const resizeDropCallback = useCallback(
    ({
      event,
      start,
      end,
    }: {
      event: CalendarDndEvent
      start: stringOrDate
      end: stringOrDate
    }) => {
      console.log('start and end', start, end)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      setInitState((prev) => {
        if (prev !== undefined) {
          const existing: CalendarDndEvent = prev.find(
            (ev: CalendarDndEvent) => ev.scheduleId === event.scheduleId,
          )!
          const filtered = prev.filter((ev) => ev.scheduleId !== event.scheduleId)
          existing.start = start
          existing.end = end
          return [...filtered, existing]
        }
      })

      const requestBody = {
        title: event.title,
        isAllday: event.isAllday,
        startDatetime: event.start,
        endDatetime: event.end,
        content: event.content,
        location: event.location,
      }

      const request: CreateScheduleRequest = {
        body: requestBody,
        calendarId: event.calendarId,
        scheduleId: event.scheduleId,
      }
      mutateUpdateSchedule(request)
    },
    [setInitState],
  )

  const handleOnSelectSlot = (data: SlotInfo) => {
    setScheduleModalData(data)
    showModal()
  }

  return (
    <>
      <DndCalendar
        date={moment().toDate()}
        defaultDate={moment().toDate()}
        defaultView="month"
        events={initState}
        localizer={localizer}
        onNavigate={onNavigate}
        onEventDrop={resizeDropCallback}
        onEventResize={resizeDropCallback}
        onSelectSlot={(r) => {
          handleOnSelectSlot(r)
        }}
        onView={onView}
        view={view}
        selectable
        showMultiDayTimes
        resizable
        style={{ height: '100%', width: '100%' }}
      />

      <AddScheduleFormModal />
    </>
  )
}
export default CalendarComponent
