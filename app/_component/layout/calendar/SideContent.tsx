'use client'

import { StyledCalendar, StyledCalendarWrapper } from '@/app/_component/Calendar/MiniCalendar'
import { useState } from 'react'
import { Value } from '@/node_modules/react-calendar/src/shared/types'
import { useModalFormState } from '@/app/_store/calendar/addScheduleModalForm'
import CalendarDropDownButton from '@/app/_component/calendarside/button/topaddbuttons/CalendarDropDownButton'
import styled from 'styled-components'
import MyCalendarsCollapse from '@/app/_component/calendarside/mycalendar/MyCalendarsCollapse'

const SideContent = () => {
  const { isOpen } = useModalFormState()
  const today = new Date()
  const [date, setDate] = useState<Value>(today)

  const handleDateChange = (newDate: Value) => {
    setDate(newDate)
  }

  return (
    <div className={'overflow-auto'}>
      <div className={'d-flex flex-column p-3 align-items-center'}>
        <CalendarDropDownButton />
        <StyledCalendarWrapper>
          <StyledCalendar
            value={date}
            locale={'ko'}
            onChange={handleDateChange}
            calendarType="gregory"
            showNeighboringMonth={false}
            next2Label={null}
            prev2Label={null}
            minDetail="year"
          />
        </StyledCalendarWrapper>
      </div>
      <MyCalendar className={'p-3'}>
        <MyCalendarsCollapse />
      </MyCalendar>
      <OtherCalendar></OtherCalendar>
    </div>
  )
}

const MyCalendar = styled.div``
const OtherCalendar = styled.div``

export default SideContent
