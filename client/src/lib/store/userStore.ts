import { create } from "zustand";
import { persist } from "zustand/middleware";

type Userdata = {
  id?: string;
  username?: string;
};

interface UserState {
  isUser: boolean;
  setIsUser: () => void;
  userData: Userdata | null;
  setUserData: (data?: Userdata) => void;
}

export const useAuthStore = create<UserState>()(
  persist(
    (set) => ({
      isUser: false,
      userData: null,
      setIsUser: () => set((state) => ({ isUser: !state.isUser })),
      setUserData: (data) => set(() => ({ userData: data })),
    }),
    {
      name: "user",
    }
  )
);

// export const useAuthStore = create<StoreState>((set) => ({
//   isUser: false,
//   userData: null,
//   setIsUser: () => set((state) => ({ isUser: !state.isUser })),
//   setUserData: (data) => set(() => ({ userData: data })),
// }));
