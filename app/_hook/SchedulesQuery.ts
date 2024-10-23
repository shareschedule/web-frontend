import { useQuery } from '@tanstack/react-query'
import { API } from '@/app/_utils/Api'
import { Pagination } from '@/app/_type/api/Pagination'
import { Schedule } from '@/app/_type/Schedule'
import { ResponseModel } from '@/app/_type/api/ResponseModel'
import { AxiosError, AxiosResponse } from 'axios'

const getSchedules = async (limit: number, offset: number) => {
  const res = await API.get(
    process.env.NEXT_PUBLIC_GET_SCHEDULES + '?limit=' + limit + '&offset=' + offset,
  )
  return res
}

export const useQueryGetSchedules = (calendarId: number, limit: number, offset: number) => {
  const {
    isLoading: isSchedulesLoading,
    isError: isSchedulesError,
    data: ownSchedulesState,
    isSuccess,
    refetch,
  } = useQuery<
    AxiosResponse<ResponseModel<Schedule[]>>,
    AxiosError,
    ResponseModel<Schedule[]>,
    [string, number]
  >(
    {
      queryKey: ['schedules', calendarId],
      queryFn: () => getSchedules(limit, offset), // 데이터 패칭 함수
      gcTime: 1000 * 60 * 60,
      staleTime: 1000 * 60 * 10,
    }, // queryKey
  )
  return {
    isSchedulesLoading,
    isSchedulesError,
    ownSchedulesState,
    isSuccess,
    refetch,
  }
}
