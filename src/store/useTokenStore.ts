import { create } from "zustand";
import { persist } from "zustand/middleware";

type TokenState = {
  token: string;
  setToken: (token: string) => void;
  resetToken: () => void;
};

export const useTokenStore = create<TokenState>()(
  persist(
    (set) => ({
      token: "",
      setToken: (token) => set({ token }),
      resetToken: () => set({ token: "" }),
    }),
    {
      name: "token-storage",
    }
  )
);
