'use client'

import { StyledCalendar, StyledCalendarWrapper } from '@/app/_component/Calendar/MiniCalendar'
import { useState } from 'react'
import { Value } from '@/node_modules/react-calendar/src/shared/types'
import AddSchduleForm from '@/app/_component/Calendar/AddSchduleForm'
import { useModalFormState } from '@/app/_store/calendar/calendar'

const SideContent = () => {
  const { isOpen } = useModalFormState()

  const today = new Date()
  const [date, setDate] = useState<Value>(today)

  const handleDateChange = (newDate: Value) => {
    setDate(newDate)
  }

  return (
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
      {isOpen ? <AddSchduleForm /> : <></>}
    </StyledCalendarWrapper>
  )
}

// const SideContentLayout = styled.div`
//   background-color: aqua;
// `
export default SideContent
