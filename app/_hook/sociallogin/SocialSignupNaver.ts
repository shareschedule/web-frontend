import API from '@/app/_utils/Api'
import { useMutation } from '@tanstack/react-query'
import { RequestSignup } from '@/app/_type/api/socialLogin/SocialLoginRequest'

const signupNaver = async (body: RequestSignup) => {
  return await API.post(process.env.NEXT_PUBLIC_SIGNUP_NAVER + '', body, {})
}

export const useSocialSignupNaver = (body: RequestSignup) => {
  const {
    isPending: isPendingSocialSignupNaver,
    isError: isErrorSocialSignupNaver,
    data: stateSocialSignupNaver,
    isSuccess: isSuccessSocialSignupNaver,
    mutate: mutateSocialSignupNaver,
  } = useMutation(
    {
      mutationFn: () => signupNaver(body),
      gcTime: 1000 * 60 * 60,
    }, // queryKey
  )
  return {
    isPendingSocialSignupNaver,
    isErrorSocialSignupNaver,
    stateSocialSignupNaver,
    isSuccessSocialSignupNaver,
    mutateSocialSignupNaver,
  }
}
