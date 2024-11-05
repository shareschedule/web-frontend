import { Button, Form, Modal } from 'react-bootstrap'
import { useModalFormState } from '@/app/_store/calendar/addScheduleModalForm'
import { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useCreateSchedule } from '@/app/_hook/schedule/CreateSchedule'

const AddScheduleFormModal = ({}) => {
  const { isOpen, showModal, closeModal, slotData } = useModalFormState()
  useCreateSchedule()

  const [scheduleTitle, setScheduleTitle] = useState('')
  const [scheduleContent, setScheduleContent] = useState('')
  const [isAllday, setIsAllday] = useState(false)
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()

  const [startDatePicker, setStartDatePicker] = useState<Date | null | undefined>(new Date())
  const [endDatePicker, setEndDatePicker] = useState<Date | null | undefined>(new Date())
  console.log('startDatePicker', startDatePicker)
  console.log('slotData', slotData)
  useEffect(() => {
    setStartDatePicker(slotData?.start)
    setEndDatePicker(slotData?.end)
  }, [slotData])
  const handleCreateSchedule = () => {}
  return (
    <>
      <Modal show={isOpen} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>스케쥴 생성</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.DateStart">
              <Form.Label>스케쥴 기간</Form.Label>
              <br />
              <Form.Label className={'me-2'}>시작일 :</Form.Label>
              <DatePicker
                dateFormat="yyyy.MM.dd"
                shouldCloseOnSelect
                selected={startDatePicker}
                onChange={(date) => {
                  setStartDatePicker(date)
                }}
              />
              <br />
              <Form.Label className={'me-2'}>종료일 :</Form.Label>
              <DatePicker
                dateFormat="yyyy.MM.dd"
                shouldCloseOnSelect
                selected={endDatePicker}
                onChange={(date) => {
                  setStartDatePicker(date)
                }}
              />
            </Form.Group>
            {/*  캘린더 이름 */}
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>스케쥴 제목</Form.Label>
              <Form.Control
                type="text"
                placeholder="제목"
                autoFocus
                onChange={(e) => {
                  setScheduleTitle(e.target.value)
                }}
              />
            </Form.Group>
            {/*  캘린더 내용? 설명 등 */}
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>내용</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="설명"
                rows={3}
                onChange={(e) => {
                  setScheduleContent(e.target.value)
                }}
              />
            </Form.Group>

            {/*    캘린더 공개 여부*/}
            <Form.Group className="mb-3" controlId="exampleForm.ControlCheckBox1">
              <Form.Switch
                type="switch"
                label="종일 여부"
                defaultChecked={isAllday}
                onChange={() => {
                  setIsAllday(!isAllday)
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            닫기
          </Button>
          <Button variant="primary" onClick={handleCreateSchedule}>
            생성
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default AddScheduleFormModal
