import { create } from 'zustand'
import { SlotInfo } from 'react-big-calendar'

interface ModalFormState {
  isOpen: boolean
  slotData: SlotInfo | null

  showModal: () => void
  closeModal: () => void

  changeIsModalOpen: (r: SlotInfo) => void
  setScheduleModalData: (r: SlotInfo) => void
  removeScheduleModalData: (r: SlotInfo) => void
}

export const useModalFormState = create<ModalFormState>((set) => ({
  isOpen: false,
  slotData: null,

  showModal: () => {
    set(() => ({
      isOpen: true,
    }))
  },
  closeModal: () => {
    set(() => ({
      isOpen: false,
    }))
  },

  changeIsModalOpen: (r) => {
    set((state) => ({
      isOpen: !state.isOpen,
    }))

    set((state) => ({
      slotData: state.isOpen ? r : null,
    }))
  },
  setScheduleModalData: (r) => {
    set(() => ({ slotData: r }))
  },
  removeScheduleModalData: () => {
    set(() => ({ slotData: null }))
  },
}))
