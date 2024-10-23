'use client'
import styled from 'styled-components'
import React from 'react'
import { Calendar } from 'react-big-calendar'
export default function Home() {
  return (
    <RootContainer>
      <Calendar />
    </RootContainer>
  )
}

const RootContainer = styled.div`
  display: flex;
`
