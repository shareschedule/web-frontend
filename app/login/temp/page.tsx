'use client'
import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { useSocialLoginNaver } from '@/app/_hook/sociallogin/SocialLoginNaver'
import { OauthCredential, RequestSignup } from '@/app/_type/api/socialLogin/SocialLoginRequest'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useGetUser } from '@/app/_hook/sociallogin/GetUser'
import { useQueryClient } from '@tanstack/react-query'

let token: string
let state: string

let oauthCredential: OauthCredential
let requestSignup: RequestSignup

export default function Home() {
  const user = useQueryClient().getQueryData('user')
  if (user == null) {
    console.log('user Ok', user)
  } else {
    console.log('user no', user)
  }
  const router = useRouter()
  const [code, setCode] = useState()
  const [state, setState] = useState()
  const [oauth, setOauth] = useState({ code: '', state: '' })
  const { stateSocialLoginNaver, isSuccessSocialLoginNaver, mutateSocialLoginNaver } =
    useSocialLoginNaver(oauth)
  // const { isErrorSocialSignupNaver, isSuccessSocialSignupNaver, mutateSocialSignupNaver } =
  //   useSocialSignupNaver(requestSignup)
  useEffect(() => {
    if (new URL(window.location.href).searchParams.has('code')) {
      setOauth({
        code: new URL(window.location.href).searchParams.get('code')!,
        state: new URL(window.location.href).searchParams.get('state')!,
      })
      mutateSocialLoginNaver()
    }
  }, [code])
  useEffect(() => {
    router.push('/')
  }, [isSuccessSocialLoginNaver])

  if (isSuccessSocialLoginNaver) {
    console.log(stateSocialLoginNaver)
  }
  const loginURL = process.env.NEXT_PUBLIC_LOGIN_NAVER_URL

  const testSign = () => {
    console.log(token, state)
    axios.get('' + process.env.NEXT_PUBLIC_LOGIN_NAVER_URL).then((data) => {
      console.log(data)
    })
  }

  return (
    <h1 className="text-sky-400 text-3xl font-bold underline">
      Hello world!
      <a href={loginURL}>
        <img height="50" src="http://static.nid.naver.com/oauth/small_g_in.PNG" />
      </a>
      <LoginButton onClick={() => mutateSocialLoginNaver()}>TestLogin</LoginButton>
      <hr />
      <LoginButton onClick={testSign}>Signup</LoginButton>a
    </h1>
  )
}

const LoginButton = styled.div`
  background-color: red;
`
