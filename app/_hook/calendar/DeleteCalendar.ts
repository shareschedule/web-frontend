import { API } from '@/app/_utils/Api'
import { useMutation } from '@tanstack/react-query'

const deleteCalendar = async (calendarId: number) => {
  return await API.delete(process.env.NEXT_PUBLIC_DELETE_CALENDAR + '/' + calendarId, {})
}

export const useDeleteCalendar = (calendarId: number) => {
  const {
    isPending: isPendingDeleteCalendar,
    isError: isErrorDeleteCalendar,
    data: stateDeleteCalendar,
    isSuccess: isSuccessDeleteCalendar,
    mutate: mutateDeleteCalendar,
  } = useMutation(
    {
      mutationKey: ['schedules'],
      mutationFn: () => deleteCalendar(calendarId),
      gcTime: 1000 * 60 * 60,
    }, // queryKey
  )
  return {
    isPendingDeleteCalendar,
    isErrorDeleteCalendar,
    stateDeleteCalendar,
    isSuccessDeleteCalendar,
    mutateDeleteCalendar,
  }
}
