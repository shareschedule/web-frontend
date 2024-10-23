import { create } from 'zustand'
import { SlotInfo } from 'react-big-calendar'

interface ModalFormState {
  isOpen: boolean
  slotData: SlotInfo | null

  changeOpen: (r: SlotInfo) => void
  setSlotData: (r: SlotInfo) => void
  removeSlotData: (r: SlotInfo) => void
}

export const useModalFormState = create<ModalFormState>((set) => ({
  isOpen: false,
  slotData: null,

  changeOpen: (r) => {
    set((state) => ({
      isOpen: !state.isOpen,
    }))

    set((state) => ({
      slotData: state.isOpen ? r : null,
    }))
  },
  setSlotData: (r) => {
    set(() => ({ slotData: r }))
  },
  removeSlotData: () => {
    set(() => ({ slotData: null }))
  },
}))
