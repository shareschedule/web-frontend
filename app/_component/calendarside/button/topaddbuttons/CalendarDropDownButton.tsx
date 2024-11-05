'use client'
import { Dropdown, DropdownButton } from 'react-bootstrap'
import './AddCalendarButton.css'
import AddCalendarButton from '@/app/_component/calendarside/button/topaddbuttons/AddCalendarButton'
import AddScheduleButton from '@/app/_component/calendarside/button/topaddbuttons/AddScheduleButton'
const CalendarDropDownButton = () => {
  return (
    <DropdownButton
      key={'down-centered'}
      id={`dropdown-button-drop-AddCalendarButton`}
      drop={'down-centered'}
      variant="primary"
      title={`만들기`}
      style={{ width: '90%' }}>
      <AddCalendarButton eventKey="1" />
      <AddScheduleButton eventKey="2" />
      <Dropdown.Item eventKey="3">기타</Dropdown.Item>
      <Dropdown.Item eventKey="4">등등</Dropdown.Item>
    </DropdownButton>
  )
}
export default CalendarDropDownButton
