import { create } from "zustand";
import { persist } from 'zustand/middleware';


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
