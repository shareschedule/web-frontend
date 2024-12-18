import { useQuery, useQueryClient } from '@tanstack/react-query'
import API from '@/app/_utils/Api'
import { Schedule } from '@/app/_type/Schedule'
import { ResponseModel } from '@/app/_type/api/responseModel/ResponseModel'
import { AxiosError, AxiosResponse } from 'axios'
import { User } from '@/app/_type/api/user/User'

const getSchedules = async (calendarId: number, limit: number, offset: number) => {
  return await API.get(
    process.env.NEXT_PUBLIC_GET_SCHEDULES +
      '?limit=' +
      limit +
      '&offset=' +
      offset +
      '&calendarId=' +
      calendarId,
  )
}

export const useGetScheduleList = (calendarId: number, limit: number, offset: number) => {
  const {
    isLoading: isLoadingScheduleList,
    isError: isErrorScheduleList,
    data: dataScheduleList,
    isSuccess: isSuccessScheduleList,
    refetch: refetchScheduleList,
  } = useQuery<
    AxiosResponse<ResponseModel<Schedule[]>>,
    AxiosError,
    ResponseModel<Schedule[]>,
    [string, number]
  >(
    {
      queryKey: ['schedules', calendarId],
      queryFn: () => getSchedules(calendarId, limit, offset),
      gcTime: 1000 * 60 * 60,
      staleTime: 1000 * 60 * 60,
      enabled: calendarId !== 0 && limit !== null && offset !== null,
    }, // queryKey
  )
  return {
    isLoadingScheduleList,
    isErrorScheduleList,
    dataScheduleList,
    isSuccessScheduleList,
    refetchScheduleList,
  }
}
