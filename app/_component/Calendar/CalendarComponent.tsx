'use client'

import React, { useCallback, useEffect, useState } from 'react'
import moment from 'moment'

import withDragAndDrop, { EventInteractionArgs } from 'react-big-calendar/lib/addons/dragAndDrop'
import { Calendar, momentLocalizer, stringOrDate, Views } from 'react-big-calendar'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import AddScheduleBtn from '@/app/_component/Calendar/AddScheduleBtn'
import { useModalFormState } from '@/app/_store/calendar/calendar'
import { useGetScheduleList } from '@/app/_hook/schedule/GetSchedule'

const localizer = momentLocalizer(moment)
const DndCalendar = withDragAndDrop(Calendar)

type CalendarDndEvent = {
  start: stringOrDate
  end: stringOrDate
  title: string
}

const CalendarComponent = () => {
  const { dataScheduleList, isSuccessScheduleList, refetchScheduleList } = useGetScheduleList(
    1,
    1,
    0,
  )
  const [initState, setInitState] = useState<CalendarDndEvent[]>()

  const [date, setDate] = useState(new Date(2015, 3, 1))
  const [view, setView] = useState(Views.MONTH)

  const onNavigate = useCallback((newDate) => setDate(newDate), [setDate])
  const onView = useCallback((newView) => setView(newView), [setView])

  useEffect(() => {
    if (isSuccessScheduleList) {
      const temp = dataScheduleList?.data.data.map((item) => {
        return {
          start: moment(item.startDatetime).toDate(),
          end: moment(item.endDatetime).add(3, 'days').toDate(),
          title: item.title,
        }
      })
      setInitState(temp)
    }
  }, [isSuccessScheduleList])

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

  const { isOpen, changeOpen, slotData } = useModalFormState()
  return (
    <>
      <AddScheduleBtn
        onclick={() => {
          console.log(isOpen, slotData)
        }}></AddScheduleBtn>
      <DndCalendar
        date={date}
        defaultDate={moment().toDate()}
        defaultView="month"
        events={initState}
        localizer={localizer}
        onNavigate={onNavigate}
        onEventDrop={onEventDrop}
        onEventResize={onEventResize}
        onSelectSlot={(r) => {
          changeOpen(r)
        }}
        onView={onView}
        view={view}
        selectable
        showMultiDayTimes
        resizable
        style={{ height: '100%', width: '100%' }}
      />
    </>
  )
}
export default CalendarComponent
