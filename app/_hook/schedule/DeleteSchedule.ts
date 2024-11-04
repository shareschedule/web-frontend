import API from '@/app/_utils/Api'
import { useMutation } from '@tanstack/react-query'

const deleteSchedule = async (scheduleId: number) => {
  return await API.delete(process.env.NEXT_PUBLIC_CREATE_SCHEDULE + '/' + scheduleId, {})
}

export const useDeleteSchedule = (scheduleId: number) => {
  const {
    isPending: isPendingDeleteSchedule,
    isError: isErrorDeleteSchedule,
    data: schedulesDeleteState,
    isSuccess: isSuccessDeleteSchedule,
    mutate: mutateDeleteSchedule,
  } = useMutation({
    mutationFn: () => deleteSchedule(scheduleId),
    gcTime: 1000 * 60 * 60,
  })
  return {
    isPendingDeleteSchedule,
    isErrorDeleteSchedule,
    schedulesDeleteState,
    isSuccessDeleteSchedule,
    mutateDeleteSchedule,
  }
}
