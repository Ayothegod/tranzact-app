import {
  UserInterface,
} from "@/lib/types/api";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface authStore {
  user: UserInterface | null;
  setUser: (user?: UserInterface) => void;
  logout: () => void;
  clearUser: () => void;
}

export const useAuthStore = create<authStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) =>
        set(() => {
          return { user: user };
        }),
      logout: () =>
        set((state) => {
          if (state.user) {
            return { user: null };
          }
          return { user: null };
        }),
      clearUser: () => set(() => ({ user: null })),
    }),
    {
      name: "auth-data",
    }
  )
);

// interface userStore {
//   userProfile: UserProfile | null;
//   setUserProfile: (userProfile: UserProfile) => void;
//   displayUserProfile: boolean;
//   setDisplayUserProfile: () => void;
// }

// export const useUserStore = create<userStore>((set) => ({
//   userProfile: null,
//   setUserProfile: (userProfile) =>
//     set(() => {
//       return { userProfile: userProfile };
//     }),
//   displayUserProfile: false,
//   setDisplayUserProfile: () =>
//     set((state) => ({
//       displayUserProfile: !state.displayUserProfile,
//     })),
// }));

