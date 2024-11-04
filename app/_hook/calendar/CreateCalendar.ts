import API from '@/app/_utils/Api'
import { useMutation } from '@tanstack/react-query'
import { CreateCalendarRequest } from '@/app/_type/Calendar'

const createCalendar = async (body: CreateCalendarRequest) => {
  return await API.post(process.env.NEXT_PUBLIC_CREATE_CALENDAR + '', body, {})
}

export const useCreateCalendar = (body: CreateCalendarRequest) => {
  const {
    isPending: isPendingCreateCalendar,
    isError: isErrorCreateCalendar,
    data: stateCreateCalendar,
    isSuccess: isSuccessCreateCalendar,
    mutate: mutateCreateCalendar,
  } = useMutation(
    {
      mutationKey: ['schedules'],
      mutationFn: () => createCalendar(body),
      gcTime: 1000 * 60 * 60,
    }, // queryKey
  )
  return {
    isPendingCreateCalendar,
    isErrorCreateCalendar,
    stateCreateCalendar,
    isSuccessCreateCalendar,
    mutateCreateCalendar,
  }
}
