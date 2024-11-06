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

moment.locale('ko-KR')
const localizer = momentLocalizer(moment)
const DndCalendar = withDragAndDrop(Calendar)

type CalendarDndEvent = {
  start: stringOrDate
  end: stringOrDate
  title: string
}

const CalendarComponent = () => {
  const { currentCalendarId } = useCurrentCalendarState()
  const { dataScheduleList, isSuccessScheduleList, refetchScheduleList } = useGetScheduleList(
    currentCalendarId,
    1,
    0,
  )
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
      }
    })
    setInitState(calendarItems)
  }, [currentCalendarId, dataScheduleList])

  const [evt, setEvt] = useState(initState)

  const onEventResize = (data: EventInteractionArgs<object>) => {
    const { start, end } = data
    const tmp = evt
    evt[0].start = start
    evt[0].end = end
    setEvt(tmp)
  }

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
        onEventResize={onEventResize}
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
