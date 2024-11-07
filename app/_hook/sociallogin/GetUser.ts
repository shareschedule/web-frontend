import { useQuery } from '@tanstack/react-query'
import API from '@/app/_utils/Api'
import { AxiosError, AxiosResponse } from 'axios'
import { User } from '@/app/_type/api/user/User'
const getUser = async () => {
  return await API.get(process.env.NEXT_PUBLIC_GET_USER + '')
}

export const useGetUser = () => {
  const {
    isLoading: isLoadingGetUser,
    isError: isErrorGetUser,
    data: dataGetUser,
    isSuccess: isSuccessGetUser,
    refetch: refetchGetUser,
  } = useQuery<AxiosResponse<User>, AxiosError, User, [string]>(
    {
      queryKey: ['user'],
      queryFn: () => getUser(),
      gcTime: 1000 * 60 * 60,
      staleTime: 1000 * 60 * 60,
    }, // queryKey
  )
  return {
    isLoadingGetUser,
    isErrorGetUser,
    dataGetUser,
    isSuccessGetUser,
    refetchGetUser,
  }
}
