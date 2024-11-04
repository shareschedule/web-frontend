import { useQuery } from '@tanstack/react-query'
import API from '@/app/_utils/Api'
import { Calendar } from '@/app/_type/Calendar'
import { AxiosError, AxiosResponse } from 'axios'
import { ResponseModel } from '@/app/_type/api/responseModel/ResponseModel'

const getOwnCalendar = async (calendarId: number) => {
  return await API.get(process.env.NEXT_PUBLIC_GET_CALENDAR + '/' + calendarId)
}

export const useGetOwnCalendar = (calendarId: number) => {
  const {
    isLoading: isLoadingGetOwnCalendars,
    isError: isErrorGetOwnCalendar,
    data: stateGetOwnCalendar,
    isSuccess: isSuccessGetOwnCalendar,
    refetch: refetchGetOwnCalendar,
  } = useQuery<
    AxiosResponse<ResponseModel<Calendar>>,
    AxiosError,
    ResponseModel<Calendar>,
    [string]
  >(
    {
      queryKey: ['OwnCalendarList'],
      queryFn: () => getOwnCalendar(calendarId),
      gcTime: 1000 * 60 * 60,
      staleTime: 1000 * 60 * 10,
    }, // queryKey
  )
  return {
    isLoadingGetOwnCalendars,
    isErrorGetOwnCalendar,
    stateGetOwnCalendar,
    isSuccessGetOwnCalendar,
    refetchGetOwnCalendar,
  }
}
