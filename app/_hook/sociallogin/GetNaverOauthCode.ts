import API from '@/app/_utils/Api'
import { useQuery } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'

const getNaverOauthCode = async () => {
  console.log(process.env.NEXT_PUBLIC_LOGIN_NAVER)
  return await API.get(process.env.NEXT_PUBLIC_LOGIN_NAVER_URL + '')
}

export const useNaverOauthCode = () => {
  const {
    isPending: isPendingSocialLoginNaver,
    isError: isErrorSocialLoginNaver,
    data: stateSocialLoginNaver,
    isSuccess: isSuccessSocialLoginNaver,
  } = useQuery<AxiosResponse<string>, AxiosError, string>(
    {
      queryKey: [],
      queryFn: () => getNaverOauthCode(),
      gcTime: 1000 * 60 * 60,
      staleTime: 1000 * 60 * 60,
    }, // queryKey
  )
  return {
    isPendingSocialLoginNaver,
    isErrorSocialLoginNaver,
    stateSocialLoginNaver,
    isSuccessSocialLoginNaver,
  }
}
