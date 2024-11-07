'use client'

import React, { useCallback, useEffect, useState } from 'react'

import withDragAndDrop, { EventInteractionArgs } from 'react-big-calendar/lib/addons/dragAndDrop'
import { Calendar, momentLocalizer, SlotInfo, stringOrDate, Views } from 'react-big-calendar'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import AddScheduleBtn from '@/app/_component/Calendar/AddScheduleBtn'
import { useModalFormState } from '@/app/_store/calendar/addScheduleModalForm'
import { useGetScheduleList } from '@/app/_hook/schedule/GetSchedule'
import moment from 'moment'
import AddScheduleFormModal from '@/app/_component/Calendar/AddScheduleFormModal'
import { useCurrentCalendarState } from '@/app/_store/calendar/currentCalendar'
import { useQueryClient } from '@tanstack/react-query'
import { useCreateSchedule } from '@/app/_hook/schedule/CreateSchedule'
import { useUpdateSchedule } from '@/app/_hook/schedule/UpdateSchedule'
import { CreateScheduleRequest, Schedule } from '@/app/_type/Schedule'

moment.locale('ko-KR')
const localizer = momentLocalizer(moment)
const DndCalendar = withDragAndDrop(Calendar)

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
  const { currentCalendarId } = useCurrentCalendarState()
  const [updateScheduleId, setUpdateScheduleId] = useState(0)

  const { dataScheduleList, isSuccessScheduleList, refetchScheduleList } = useGetScheduleList(
    currentCalendarId,
    1,
    0,
  )
  const { mutateUpdateSchedule } = useUpdateSchedule()
  const scheduleDataList = useQueryClient().getQueryData(['schedules', currentCalendarId])
  const { isSuccessCreateSchedule } = useCreateSchedule()
  const [initState, setInitState] = useState<CalendarDndEvent[]>()

  const [date, setDate] = useState(new Date(2015, 3, 1))
  const [view, setView] = useState(Views.MONTH)

  const onNavigate = useCallback((newDate) => setDate(newDate), [setDate])
  const onView = useCallback((newView) => setView(newView), [setView])

  const { isOpen, showModal, closeModal, changeIsModalOpen, slotData, setScheduleModalData } =
    useModalFormState()

  useEffect(() => {
    const calendarItems = dataScheduleList?.data.data.map((item) => {
      return {
        start: moment(item.startDatetime).toDate(),
        end: moment(item.endDatetime).toDate(),
        title: item.title,
        scheduleId: item.id,
        calendarId: item.calendarId,
      }
    })
    setInitState(calendarItems)
  }, [currentCalendarId, dataScheduleList])

  const resizeCallback = useCallback(
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
  const onEventDrop = (data: EventInteractionArgs<object>) => {
    //TODO: dnd evt 추가하기
  }

  const handleOnSelectSlot = (data: SlotInfo) => {
    data.end = moment(data.end).subtract(1, 'minute').toDate()
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
        onEventDrop={onEventDrop}
        onEventResize={resizeCallback}
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
