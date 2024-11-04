'use client'

import TopNav from '@/app/_component/layout/calendar/TopNav'
import MainContent from '@/app/_component/layout/calendar/MainContent'
import CalendarLayoutContainer from '@/app/_component/layout/calendar/CalendarLayoutContainer'
import SideContent from '@/app/_component/layout/calendar/SideContent'
import { useGetUser } from '@/app/_hook/sociallogin/GetUser'

export default function Home() {
  const { dataGetUser } = useGetUser()

  console.log(dataGetUser?.data)
  if (dataGetUser?.data == null) return null
  return (
    <CalendarLayoutContainer>
      <TopNav />
      <SideContent />
      <MainContent />
    </CalendarLayoutContainer>
  )
}
