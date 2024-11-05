import API from '@/app/_utils/Api'
import { useMutation } from '@tanstack/react-query'
import { CreateScheduleRequest } from '@/app/_type/Schedule'

const createSchedule = async (calendarId: number, body: CreateScheduleRequest) => {
  return await API.post(
    process.env.NEXT_PUBLIC_CREATE_SCHEDULE + '?calendarId=' + calendarId,
    body,
    {},
  )
}

export const useCreateSchedule = (calendarId: number) => {
  const {
    isPending: isPendingCreateSchedule,
    isError: isErrorCreateSchedule,
    data: stateCreateSchedule,
    isSuccess: isSuccessCreateSchedule,
    mutate: mutateCreateSchedule,
  } = useMutation(
    {
      mutationKey: ['schedules', calendarId],
      mutationFn: (body: CreateScheduleRequest) => createSchedule(calendarId, body),
      gcTime: 1000 * 60 * 60,
    }, // queryKey
  )
  return {
    isPendingCreateSchedule,
    isErrorCreateSchedule,
    stateCreateSchedule,
    isSuccessCreateSchedule,
    mutateCreateSchedule,
  }
}
