import { create } from "zustand";

type Userdata = {
  id?: string;
  username?: string;
};

interface StoreState {
  count: number;
  increase: () => void;
  isUser: boolean;
  userData: Userdata;
  setUserData: (data: any) => void;
}

export const useAuthStore = create<StoreState>((set) => ({
  count: 0,
  increase: () => set((state) => ({ count: state.count + 1 })),
  isUser: false,
  userData: { id: "1", username: "Test User" },
  setUserData: (data) => set((state) => ({ userData: data })),
}));

// im using zustand, i want to be able to persist and  delete pesisted data