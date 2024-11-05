import { useGetOwnCalendarList } from '@/app/_hook/calendar/GetOwnCalendarList'
import { ListGroup } from 'react-bootstrap'

const MyCalendarList = () => {
  const { stateGetOwnCalendarList } = useGetOwnCalendarList()
  console.log(stateGetOwnCalendarList)
  return (
    <>
      <ListGroup variant="flush">
        {stateGetOwnCalendarList?.data.map((item, key) => {
          return (
            <div key={key}>
              <ListGroup.Item key={key}>
                <div key={key}>title: {item.title}</div>
              </ListGroup.Item>
            </div>
          )
        })}
      </ListGroup>
    </>
  )
}

export default MyCalendarList
