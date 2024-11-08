import { useGetOwnCalendarList } from '@/app/_hook/calendar/GetOwnCalendarList'
import { Button, Collapse, ListGroup } from 'react-bootstrap'
import { useGetScheduleList } from '@/app/_hook/schedule/GetSchedule'
import { useCurrentCalendarState } from '@/app/_store/calendar/currentCalendar'
import { useQueryClient } from '@tanstack/react-query'
import { useUpdateRecentSchedule } from '@/app/_hook/user/UpdateRecentCalendar'
import { UpdateRecentCalendarRequest } from '@/app/_type/api/user/UpdateRecentCalendarRequest'
import { useState } from 'react'

const MyCalendarList = () => {
  const [open, setOpen] = useState(true)

  const { currentCalendarId, setCurrentCalendarId } = useCurrentCalendarState()
  const queryClient = useQueryClient()
  const request: UpdateRecentCalendarRequest = {
    recentCalendarId: currentCalendarId,
  }
  const { mutateUpdateRecentSchedule } = useUpdateRecentSchedule(request)

  const { stateGetOwnCalendarList } = useGetOwnCalendarList()
  const {} = useGetScheduleList(currentCalendarId || 0, 1, 0)

  const handleClickCalendar = (id: number) => {
    queryClient.invalidateQueries({
      queryKey: ['schedules', id],
    })
    setCurrentCalendarId(id)
    mutateUpdateRecentSchedule()
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
        <ListGroup variant="flush">
          {stateGetOwnCalendarList?.data.map((item, key) => {
            return (
              <ListGroup.Item key={key} onClick={() => handleClickCalendar(item?.id)}>
                <div key={key}>title: {item.title}</div>
              </ListGroup.Item>
            )
          })}
        </ListGroup>
      </Collapse>
    </div>
  )
}

export default MyCalendarList
