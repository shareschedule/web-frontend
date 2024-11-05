import { Dropdown } from 'react-bootstrap'
import { useCreateCalendar } from '@/app/_hook/calendar/CreateCalendar'

const AddCalendarButton = ({ eventKey }: { eventKey: string }) => {
  const { mutateCreateCalendar } = useCreateCalendar()

  return (
    <>
      <Dropdown.Item eventKey={eventKey}>캘린더 추가</Dropdown.Item>
    </>
  )
}

export default AddCalendarButton
