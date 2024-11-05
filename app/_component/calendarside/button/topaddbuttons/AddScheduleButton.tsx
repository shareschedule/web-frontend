import { Dropdown } from 'react-bootstrap'

const AddScheduleButton = ({ eventKey }: { eventKey: string }) => {
  return (
    <>
      <Dropdown.Item eventKey={eventKey}>일정 추가</Dropdown.Item>
    </>
  )
}

export default AddScheduleButton
