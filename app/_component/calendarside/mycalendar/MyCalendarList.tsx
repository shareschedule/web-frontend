import { useGetOwnCalendarList } from '@/app/_hook/calendar/GetOwnCalendarList'
import { ListGroup } from 'react-bootstrap'
import { useGetScheduleList } from '@/app/_hook/schedule/GetSchedule'
import { useState } from 'react'

const MyCalendarList = () => {
  const [calendarId, setCalendarId] = useState(-1)
  const { stateGetOwnCalendarList } = useGetOwnCalendarList()
  const { dataScheduleList } = useGetScheduleList(calendarId, 1, 0)
  console.log(dataScheduleList)
  return (
    <>
      <ListGroup variant="flush">
        {stateGetOwnCalendarList?.data.map((item, key) => {
          return (
            <ListGroup.Item key={key} onClick={() => setCalendarId(item?.id)}>
              <div key={key}>title: {item.title}</div>
            </ListGroup.Item>
          )
        })}
      </ListGroup>
    </>
  )
}

export default MyCalendarList
