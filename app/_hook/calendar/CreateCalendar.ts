import API from '@/app/_utils/Api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CreateCalendarRequest } from '@/app/_type/Calendar'

const createCalendar = async (body: CreateCalendarRequest) => {
  return await API.post(process.env.NEXT_PUBLIC_CREATE_CALENDAR + '', body, {})
}

export const useCreateCalendar = () => {
  const queryClient = useQueryClient()
  const {
    isPending: isPendingCreateCalendar,
    isError: isErrorCreateCalendar,
    data: stateCreateCalendar,
    isSuccess: isSuccessCreateCalendar,
    mutate: mutateCreateCalendar,
  } = useMutation(
    {
      mutationKey: ['schedules'],
      mutationFn: (body: CreateCalendarRequest) => createCalendar(body),
      gcTime: 1000 * 60 * 60,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['OwnCalendarList'] })
      },
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
