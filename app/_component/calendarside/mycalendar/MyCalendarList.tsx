import { useGetOwnCalendarList } from '@/app/_hook/calendar/GetOwnCalendarList'
import { ListGroup } from 'react-bootstrap'
import { useGetScheduleList } from '@/app/_hook/schedule/GetSchedule'
import { useState } from 'react'
import { useCurrentCalendarState } from '@/app/_store/calendar/currentCalendar'
import { useQueryClient } from '@tanstack/react-query'
import { ResponseModel } from '@/app/_type/api/responseModel/ResponseModel'
import { User } from '@/app/_type/api/user/User'

const MyCalendarList = () => {
  const queryClient = useQueryClient()
  const user: ResponseModel<User> | undefined = useQueryClient().getQueryData(['user'])

  const [calendarId, setCalendarId] = useState(user?.data.data.recentCalendarId)

  const { setCurrentCalendarId } = useCurrentCalendarState()
  const { stateGetOwnCalendarList } = useGetOwnCalendarList()
  const {} = useGetScheduleList(calendarId || 0, 1, 0)

  const handleClickCalendar = (id: number) => {
    queryClient.invalidateQueries({
      queryKey: ['schedules', id],
    })
    setCurrentCalendarId(id)
    setCalendarId(id)
  }
  return (
    <>
      <ListGroup variant="flush">
        {stateGetOwnCalendarList?.data.map((item, key) => {
          return (
            <ListGroup.Item key={key} onClick={() => handleClickCalendar(item?.id)}>
              <div key={key}>title: {item.title}</div>
            </ListGroup.Item>
          )
        })}
      </ListGroup>
    </>
  )
}

export default MyCalendarList
