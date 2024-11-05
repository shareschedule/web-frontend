import { useQuery } from '@tanstack/react-query'
import API from '@/app/_utils/Api'
import { Calendar } from '@/app/_type/Calendar'
import { AxiosError, AxiosResponse } from 'axios'
import { CalendarResponseModel } from '@/app/_type/api/responseModel/ResponseModel'

const getOwnCalendarList = async () => {
  return await API.get(process.env.NEXT_PUBLIC_GET_CALENDAR_LIST + '')
}

export const useGetOwnCalendarList = () => {
  const {
    isLoading: isLoadingGetOwnCalendarList,
    isError: isErrorGetOwnCalendarList,
    data: stateGetOwnCalendarList,
    isSuccess: isSuccessGetOwnCalendarList,
    refetch: refetchGetOwnCalendarList,
  } = useQuery<
    AxiosResponse<CalendarResponseModel<Calendar[]>>,
    AxiosError,
    CalendarResponseModel<Calendar[]>,
    [string]
  >(
    {
      queryKey: ['OwnCalendarList'],
      queryFn: () => getOwnCalendarList(),
      gcTime: 1000 * 60 * 60,
      staleTime: 1000 * 60 * 10,
    }, // queryKey
  )
  return {
    isLoadingGetOwnCalendarList,
    isErrorGetOwnCalendarList,
    stateGetOwnCalendarList,
    isSuccessGetOwnCalendarList,
    refetchGetOwnCalendarList,
  }
}
