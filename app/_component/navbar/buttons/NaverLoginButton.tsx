'use client'
import { useRouter } from 'next/navigation'
import { Button } from 'react-bootstrap'

const NaverLoginButton = () => {
  const loginURL = process.env.NEXT_PUBLIC_LOGIN_NAVER_URL

  const router = useRouter()
  return <Button onClick={() => router.push(loginURL + '')}>로그인</Button>
}

export default NaverLoginButton
