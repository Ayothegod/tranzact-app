import { create } from "zustand";

interface LoadingState {
  process: boolean;
  setProcess: () => void;
  debtModal: boolean;
  setDebtModal: () => void;
  isCreatingDebt: boolean;
  setIsCreatingDebt: () => void;
  createCategory: boolean;
  setCreateCategory: () => void;
}

export const useProcessStore = create<LoadingState>((set) => ({
  process: false,
  setProcess: () => set((state) => ({ process: !state.process })),
  debtModal: false,
  setDebtModal: () => set((state) => ({ debtModal: !state.debtModal })),
  isCreatingDebt: false,
  setIsCreatingDebt: () =>
    set((state) => ({ isCreatingDebt: !state.isCreatingDebt })),
  createCategory: true,
  setCreateCategory: () =>
    set((state) => ({ createCategory: !state.createCategory })),
}));
