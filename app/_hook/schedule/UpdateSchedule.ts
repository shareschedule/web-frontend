import API from '@/app/_utils/Api'
import { useMutation } from '@tanstack/react-query'
import { CreateScheduleRequest, UpdateScheduleRequestBody } from '@/app/_type/Schedule'

const updateSchedule = async (
  calendarId: number,
  scheduleId: number,
  body: UpdateScheduleRequestBody,
) => {
  return await API.put(
    //   TODO: CalendarId 은닉하기 : body에 넣기? 혹은 PathVariable 유지 ?
    process.env.NEXT_PUBLIC_UPDATE_SCHEDULE + '/' + calendarId + '/' + scheduleId,
    body,
    {},
  )
}

export const useUpdateSchedule = () => {
  let calendarId = -1
  const {
    isPending: isPendingUpdateSchedule,
    isError: isErrorUpdateSchedule,
    data: dataUpdateState,
    isSuccess: isSuccessUpdateSchedule,
    mutate: mutateUpdateSchedule,
  } = useMutation(
    {
      mutationKey: ['schedules', calendarId],
      mutationFn: (request: CreateScheduleRequest) => {
        calendarId = request.calendarId
        return updateSchedule(request.calendarId, request.scheduleId, request.body)
      },
      gcTime: 1000 * 60 * 60,
    }, // queryKey
  )

  return {
    isPendingUpdateSchedule,
    isErrorUpdateSchedule,
    dataUpdateState,
    isSuccessUpdateSchedule,
    mutateUpdateSchedule,
  }
}
