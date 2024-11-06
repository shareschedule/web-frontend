import API from '@/app/_utils/Api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CreateScheduleRequest } from '@/app/_type/Schedule'
import { useGetScheduleList } from '@/app/_hook/schedule/GetSchedule'

const createSchedule = async (calendarId: number, body: CreateScheduleRequest) => {
  return await API.post(
    process.env.NEXT_PUBLIC_CREATE_SCHEDULE + '?calendarId=' + calendarId,
    body,
    {},
  )
}

export const useCreateSchedule = (calendarId: number) => {
  const queryClient = useQueryClient()
  const { refetchScheduleList } = useGetScheduleList(calendarId, 1, 0)
  const {
    isPending: isPendingCreateSchedule,
    isError: isErrorCreateSchedule,
    data: stateCreateSchedule,
    isSuccess: isSuccessCreateSchedule,
    mutate: mutateCreateSchedule,
  } = useMutation(
    {
      mutationKey: ['schedules', calendarId],
      mutationFn: (body: CreateScheduleRequest) => {
        return createSchedule(calendarId, body)
      },
      gcTime: 1000 * 60 * 60,
      onSuccess: () => {
        refetchScheduleList()
      },
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
