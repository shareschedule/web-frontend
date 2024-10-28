import { API } from '@/app/_utils/Api'
import { useMutation } from '@tanstack/react-query'
import { CreateCalendarRequest } from '@/app/_type/Calendar'

const updateCalendar = async (calendarId: number, body: CreateCalendarRequest) => {
  return await API.put(process.env.NEXT_PUBLIC_UPDATE_CALENDAR + '/' + calendarId, body, {})
}

export const useUpdateCalendar = (calendarId: number, body: CreateCalendarRequest) => {
  const {
    isPending: isPendingUpdateCalendar,
    isError: isErrorUpdateCalendar,
    data: stateUpdateCalendar,
    isSuccess: isSuccessUpdateCalendar,
    mutate: mutateUpdateCalendar,
  } = useMutation(
    {
      mutationKey: ['schedules'],
      mutationFn: () => updateCalendar(calendarId, body),
      gcTime: 1000 * 60 * 60,
    }, // queryKey
  )
  return {
    isPendingUpdateCalendar,
    isErrorUpdateCalendar,
    stateUpdateCalendar,
    isSuccessUpdateCalendar,
    mutateUpdateCalendar,
  }
}
