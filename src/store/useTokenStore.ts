import { create } from "zustand";
import { persist } from "zustand/middleware";

type TokenState = {
  token: string | null;
  setToken: (token: string) => void;
  resetToken: () => void;
};

export const useTokenStore = create<TokenState>()(
  persist(
    (set) => ({
      token: "wqeqweqweqwewwq413123",
      setToken: (token) => set({ token }),
      resetToken: () => set({ token: null }),
    }),
    {
      name: "token-storage",
    }
  )
);
