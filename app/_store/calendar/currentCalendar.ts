import { create } from 'zustand'

interface CurrentCalendarState {
  currentCalendarId: number
  setCurrentCalendarId: (id: number) => void
}

export const useCurrentCalendarState = create<CurrentCalendarState>((set) => ({
  currentCalendarId: 0,

  setCurrentCalendarId: (id: number) => {
    set(() => ({
      currentCalendarId: id,
    }))
  },
}))
