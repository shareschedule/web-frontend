'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useSocialLoginNaver } from '@/app/_hook/sociallogin/SocialLoginNaver'
import { Spinner } from 'react-bootstrap'

export default function Home() {
  const router = useRouter()
  const { isSuccessSocialLoginNaver, mutateSocialLoginNaver, isErrorSocialLoginNaver } =
    useSocialLoginNaver({
      code: new URL(window.location.href).searchParams.get('code')!,
      state: new URL(window.location.href).searchParams.get('state')!,
    })

  useEffect(() => {
    if (new URL(window.location.href).searchParams.has('code')) {
      mutateSocialLoginNaver()
    }
  }, [])

  useEffect(() => {
    if (isSuccessSocialLoginNaver || isErrorSocialLoginNaver) {
      router.push('/')
    }
  }, [isSuccessSocialLoginNaver, isErrorSocialLoginNaver])

  return (
    <h1 className="text-sky-400 text-3xl font-bold underline">
      <Spinner animation="border" variant="success" />
    </h1>
  )
}
