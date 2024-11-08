'use client'
import React, { useEffect } from 'react'
import { useGetUser } from '@/app/_hook/user/GetUser'
import { useRouter } from 'next/navigation'

export default function Home() {
  const { dataGetUser, isSuccessGetUser, isErrorGetUser } = useGetUser()
  const router = useRouter()

  useEffect(() => {
    if (isSuccessGetUser) {
      console.log(dataGetUser, isSuccessGetUser, isErrorGetUser)
      router.replace('/calendar')
    }
    // router.push('/calendar')
  }, [isSuccessGetUser])

  return (
    <>
      <h1>Main Page 입니다</h1>
    </>
  )
}
