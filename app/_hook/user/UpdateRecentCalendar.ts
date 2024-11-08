import API from '@/app/_utils/Api'
import { useMutation } from '@tanstack/react-query'
import { UpdateRecentCalendarRequest } from '@/app/_type/api/user/UpdateRecentCalendarRequest'

const updateRecentCalendarRequest = async (body: UpdateRecentCalendarRequest) => {
  return await API.put(process.env.NEXT_PUBLIC_UPDATE_RECENT_SCHEDULE + '', body, {})
}

export const useUpdateRecentSchedule = (body: UpdateRecentCalendarRequest) => {
  const {
    isPending: isPendingUpdateRecentSchedule,
    isError: isErrorUpdateRecentSchedule,
    data: dataUpdateRecentScheduleState,
    isSuccess: isSuccessUpdateRecentSchedule,
    mutate: mutateUpdateRecentSchedule,
  } = useMutation(
    {
      mutationFn: () => updateRecentCalendarRequest(body),
      gcTime: 1000 * 60 * 60,
    }, // queryKey
  )

  return {
    isPendingUpdateRecentSchedule,
    isErrorUpdateRecentSchedule,
    dataUpdateRecentScheduleState,
    isSuccessUpdateRecentSchedule,
    mutateUpdateRecentSchedule,
  }
}
