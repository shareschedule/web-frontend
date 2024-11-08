import { Dropdown } from 'react-bootstrap'
import { useCurrentCalendarState } from '@/app/_store/calendar/currentCalendar'
import { useModalFormState } from '@/app/_store/calendar/addScheduleModalForm'

const AddScheduleButton = ({ eventKey }: { eventKey: string }) => {
  const { setScheduleModalData } = useModalFormState()

  return (
    <>
      <Dropdown.Item eventKey={eventKey}>일정 추가</Dropdown.Item>
    </>
  )
}

export default AddScheduleButton
