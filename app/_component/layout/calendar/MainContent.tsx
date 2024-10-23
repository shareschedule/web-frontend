'use client'

import styled from 'styled-components'
import CalendarComponent from '@/app/_component/Calendar/CalendarComponent'
const MainContent = () => {
  return (
    <MainContentLayout>
      <CalendarComponent />
      {/*<AddSchduleForm />*/}
    </MainContentLayout>
  )
}

const MainContentLayout = styled.div``
export default MainContent
