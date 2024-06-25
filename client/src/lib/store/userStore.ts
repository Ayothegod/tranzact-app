import { create } from "zustand";

interface StoreState {
  count: number;
  increase: () => void;
  isUser: boolean;
  userData: object;
}

export const useAuthStore = create<StoreState>((set) => ({
  count: 0,
  increase: () => set((state) => ({ count: state.count + 1 })),
  isUser: false,
  userData: {},
}));
