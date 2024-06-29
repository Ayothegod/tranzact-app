import { create } from "zustand";
import { persist } from "zustand/middleware";

type Userdata = {
  id?: string;
  username?: string;
};

interface StoreState {
  isUser: boolean;
  setIsUser: () => void;
  userData: Userdata;
  setUserData: (data: any) => void;
}

export const useAuthStore = create(
  persist(
    (set) => ({
      isUser: false,
      userData: {},
      setIsUser: () => set((state: any) => ({ isUser: !state.isUser })),
      setUserData: (data: any) => set((state: any) => ({ userData: data })),
    }),
    {
      name: "user-profile",
    }
  )
);
