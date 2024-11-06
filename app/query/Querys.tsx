'use client'
import { useEffect } from 'react'
import { CreateScheduleRequest } from '@/app/_type/Schedule'
import moment from 'moment'
import { useUpdateSchedule } from '@/app/_hook/schedule/UpdateSchedule'
import { useDeleteSchedule } from '@/app/_hook/schedule/DeleteSchedule'
import { useGetOwnCalendarList } from '@/app/_hook/calendar/GetOwnCalendarList'
import { useGetOwnCalendar } from '@/app/_hook/calendar/GetOwnCalendar'
import { useCreateCalendar } from '@/app/_hook/calendar/CreateCalendar'
import { CreateCalendarRequest } from '@/app/_type/Calendar'
import { useUpdateCalendar } from '@/app/_hook/calendar/UpdateCalendar'
import { useDeleteCalendar } from '@/app/_hook/calendar/DeleteCalendar'
import { useGetUser } from '@/app/_hook/sociallogin/GetUser'

const Querys = () => {
  const requestSchedule: CreateScheduleRequest = {
    title: 'test titletest titletest titletest title',
    isAllday: true,
    startDatetime: moment().toDate(),
    endDatetime: moment(moment.now()).add(3, 'day').toDate(),
    content: 'test content',
    location: '역삼동',
  }
  const requestCalendar: CreateCalendarRequest = {
    isPublic: true,
    title: 'test Calendar',
    content: 'testConntent',
  }
  const requestChangeCalendar: CreateCalendarRequest = {
    isPublic: false,
    title: 'changed Calendar',
    content: 'changed content',
  }

  //Schdule
  const { mutateUpdateSchedule } = useUpdateSchedule(8, 65, requestSchedule)
  const { mutateDeleteSchedule } = useDeleteSchedule(65)

  //Calendar
  const { stateGetOwnCalendarList, isSuccessGetOwnCalendarList } = useGetOwnCalendarList()
  const { stateGetOwnCalendar, isSuccessGetOwnCalendar } = useGetOwnCalendar(8)
  const { mutateCreateCalendar } = useCreateCalendar()
  const { mutateUpdateCalendar } = useUpdateCalendar(12, requestChangeCalendar)
  const { mutateDeleteCalendar } = useDeleteCalendar(10)

  //
  const { dataGetUser, isSuccessGetUser } = useGetUser()
  useEffect(() => {
    console.log('GET User Info', dataGetUser)
  }, [isSuccessGetUser])
  return (
    <>
      <h1>Schedule</h1>
      <button onClick={() => mutateUpdateSchedule()}>[PUT O] Schedule 업데이트</button>
      <br />
      <button onClick={() => mutateDeleteSchedule()}>[DEL O] Schedule 삭제</button>
      <hr />
      <button>[GET O] Calendar 단건 조회</button>
      <br />
      <button>[GET O] Calendar 리스트 조회</button>
      <hr />
      <h1>Calendar</h1>

      <br />
      <button onClick={() => mutateCreateCalendar()}>[PUT O] Calendar 생성</button>
      <br />
      <button onClick={() => mutateUpdateCalendar()}>[PUT O] Calendar 업데이트</button>
      <br />
      <button onClick={() => mutateDeleteCalendar()}>[DEL O] Calendar 삭제</button>
      <br />
    </>
  )
}

export default Querys
