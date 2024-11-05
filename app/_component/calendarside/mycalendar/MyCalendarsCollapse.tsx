import { Button, Collapse, Form, Modal } from 'react-bootstrap'
import { SetStateAction, useState } from 'react'
import { useCreateCalendar } from '@/app/_hook/calendar/CreateCalendar'
import { CreateCalendarRequest } from '@/app/_type/Calendar'
import MyCalendarList from '@/app/_component/calendarside/mycalendar/MyCalendarList'

const MyCalendarsCollapse = () => {
  const [open, setOpen] = useState(true)
  const [show, setShow] = useState(false)

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [isPublic, setIsPublic] = useState(false)

  const { mutateCreateCalendar } = useCreateCalendar()

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const handleTitle = (e: { target: { value: SetStateAction<string> } }) => {
    setTitle(e.target.value)
  }
  const handleContent = (e: { target: { value: SetStateAction<string> } }) => {
    setContent(e.target.value)
  }
  const handlePublic = () => {
    setIsPublic(!isPublic)
  }
  const handleCreateCalendar = () => {
    const requestDate: CreateCalendarRequest = {
      isPublic: isPublic,
      title: title,
      content: content,
    }
    mutateCreateCalendar(requestDate)
    setShow(false)
  }
  return (
    <div>
      <Button
        onClick={() => setOpen(!open)}
        aria-controls="example-collapse-text"
        className={
          'bg-opacity-10 border-0 w-100 text-bg-info d-flex justify-content-between align-items-center'
        }
        aria-expanded={open}>
        <div>내 캘린더</div>
        <div>
          up
          <Button
            className={'ms-2'}
            variant="outline-dark"
            onClick={(e) => {
              e.stopPropagation()
              handleShow()
            }}>
            +
          </Button>
        </div>
      </Button>
      <Collapse in={open}>
        <MyCalendarList />
      </Collapse>

      {/*  캘린더 생성 모달 창 */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>캘린더 생성</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/*  캘린더 이름 */}
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>캘린더 제목</Form.Label>
              <Form.Control type="text" placeholder="제목" autoFocus onChange={handleTitle} />
            </Form.Group>
            {/*  캘린더 내용? 설명 등 */}
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>캘린더 내용</Form.Label>
              <Form.Control as="textarea" placeholder="설명" rows={3} onChange={handleContent} />
            </Form.Group>

            {/*    캘린더 공개 여부*/}
            <Form.Group className="mb-3" controlId="exampleForm.ControlCheckBox1">
              <Form.Switch
                type="switch"
                label="캘린더 공개여부"
                onChange={handlePublic}
                defaultChecked={isPublic}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            닫기
          </Button>
          <Button variant="primary" onClick={handleCreateCalendar}>
            생성
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default MyCalendarsCollapse
