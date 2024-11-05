'use client'

import styled from 'styled-components'

const CalendarLayoutContainer = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return <GridLayout>{children}</GridLayout>
}

const GridLayout = styled.div`
  overflow: auto;
  display: grid;
  grid-template-columns: 1fr 4fr;
  height: 100%;
`

export default CalendarLayoutContainer
