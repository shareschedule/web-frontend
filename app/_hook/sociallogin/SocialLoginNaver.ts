import API from '@/app/_utils/Api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { OauthCredential } from '@/app/_type/api/socialLogin/SocialLoginRequest'
import { useGetUser } from '@/app/_hook/sociallogin/GetUser'

const DAY = 60 * 60 * 24
const HOUR = 60 * 60
const MIN = 60

const ACCESS_TOKEN_MAX_AGE = 12 * HOUR
const REFRESH_TOKEN_MAX_AGE = 3 * DAY

const loginNaver = async (body: OauthCredential) => {
  return await API.post(process.env.NEXT_PUBLIC_LOGIN_NAVER + '', body, {
    withCredentials: true,
  })
}

export const useSocialLoginNaver = (body: OauthCredential) => {
  const queryClient = useQueryClient()
  // const { refetchGetUser } = useGetUser()

  const {
    isPending: isPendingSocialLoginNaver,
    isError: isErrorSocialLoginNaver,
    data: stateSocialLoginNaver,
    isSuccess: isSuccessSocialLoginNaver,
    mutate: mutateSocialLoginNaver,
  } = useMutation(
    {
      mutationFn: () => loginNaver(body),
      onSuccess: ({ data }) => {
        const accessToken = data.data.accessToken
        const refreshToken = data.data.refreshToken
        const user = data.data.user

        const accessTokenCookie =
          'accessToken=' + accessToken + ';max-age=' + ACCESS_TOKEN_MAX_AGE + ';path=/;'
        const refreshTokenCookie =
          'refreshToken=' + refreshToken + ';max-age=' + REFRESH_TOKEN_MAX_AGE + ';path=/;'

        document.cookie = accessTokenCookie
        document.cookie = refreshTokenCookie

        // TODO: 나중에 필요없으면 지우기
        localStorage.setItem('user', JSON.stringify(data.data))
        queryClient.setQueryData(['user'], user)
      },
      gcTime: 1000 * 60 * 60,
    }, // queryKey
  )
  return {
    isPendingSocialLoginNaver,
    isErrorSocialLoginNaver,
    stateSocialLoginNaver,
    isSuccessSocialLoginNaver,
    mutateSocialLoginNaver,
  }
}
