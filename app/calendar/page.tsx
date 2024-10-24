'use client'

import TopNav from '@/app/_component/layout/calendar/TopNav'
import MainContent from '@/app/_component/layout/calendar/MainContent'
import CalendarLayoutContainer from '@/app/_component/layout/calendar/CalendarLayoutContainer'
import SideContent from '@/app/_component/layout/calendar/SideContent'

export default function Home() {
  return (
    <CalendarLayoutContainer>
      <TopNav />
      <SideContent />
      <MainContent />
    </CalendarLayoutContainer>
  )
}
