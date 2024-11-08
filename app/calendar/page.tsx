'use client'

import MainContent from '@/app/_component/layout/calendar/MainContent'
import CalendarLayoutContainer from '@/app/_component/layout/calendar/CalendarLayoutContainer'
import SideContent from '@/app/_component/layout/calendar/SideContent'
import { useGetUser } from '@/app/_hook/user/GetUser'
import { useEffect } from 'react'

export default function Home() {
  const { dataGetUser, isLoadingGetUser, isSuccessGetUser } = useGetUser()
  useEffect(() => {
    if (isSuccessGetUser) console.log(dataGetUser)
  }, [])
  if (dataGetUser == null) return null
  return (
    <CalendarLayoutContainer>
      <SideContent />
      <MainContent />
    </CalendarLayoutContainer>
  )
}
