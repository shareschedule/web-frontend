'use client'

import { Container, Navbar } from 'react-bootstrap'
import NaverLoginButton from '@/app/_component/navbar/buttons/NaverLoginButton'
import React from 'react'
import { useGetUser } from '@/app/_hook/user/GetUser'
import { useRouter } from 'next/navigation'

const TopNav = () => {
  const { dataGetUser, isSuccessGetUser, isErrorGetUser } = useGetUser()
  const router = useRouter()
  return (
    <Navbar className="border border-dark border-opacity-50" style={{ boxShadow: '0px 1px ' }}>
      <Container>
        <Navbar.Brand href="/">이름 미정</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          {isSuccessGetUser ? dataGetUser?.data?.data.nickname : <NaverLoginButton />}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default TopNav
