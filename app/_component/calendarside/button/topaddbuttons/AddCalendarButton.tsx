import { Dropdown } from 'react-bootstrap'

const AddCalendarButton = ({ eventKey }: { eventKey: string }) => {
  return (
    <>
      <Dropdown.Item eventKey={eventKey}>캘린더 추가</Dropdown.Item>
    </>
  )
}

export default AddCalendarButton
