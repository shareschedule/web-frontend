import { useQuery } from '@tanstack/react-query'
import { API } from '@/app/_utils/Api'
import { Calendar } from '@/app/_type/Calendar'
import { Pagination } from '@/app/_type/api/Pagination'
import { AxiosError, AxiosResponse } from 'axios'
import { ResponseModel } from '@/app/_type/api/ResponseModel'
import { Schedule } from '@/app/_type/Schedule'

const getOwnCalendars = async () => {
  const res = await API.get(process.env.NEXT_PUBLIC_GET_CALENDAR + '')
  return res.data
}

export const useQueryGetOwnCalendars = () => {
  const {
    isLoading: isOwnCalendarsLoading,
    isError: isOwnCalendarsError,
    data: ownCalendarsState,
    isSuccess,
    refetch,
  } = useQuery<
    AxiosResponse<ResponseModel<Calendar[]>>,
    AxiosError,
    ResponseModel<Calendar[]>,
    [string]
  >(
    {
      queryKey: ['OwnCalendars'],
      queryFn: () => getOwnCalendars(), // 데이터 패칭 함수
      gcTime: 1000 * 60 * 60,
      staleTime: 1000 * 60 * 10,
    }, // queryKey
  )
  return {
    isOwnCalendarsLoading,
    isOwnCalendarsError,
    ownCalendarsState,
    isSuccess,
    refetch,
  }
}
