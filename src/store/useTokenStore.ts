import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useTokenStore = create()(
  persist(
    (set) => ({
      token: "",
      setToken: (token: string) => set(() => ({ token })),
      resetToken: () => set(() => ({ token: "" })),
    }),
    { name: "token-storage" }
  )
);
