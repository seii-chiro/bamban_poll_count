import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type ERHeaderStatus = "submitted" | "not_submitted" | "disabled";

interface ERHeaderStatusState {
  erHeaderStatus: ERHeaderStatus;
  erHeaderSubmitted: boolean;
  setERHeaderStatus: (status: ERHeaderStatus) => void;
  setERHeaderSubmitted: (submitted: boolean) => void;
}

export const useERHeaderStatusStore = create(
  persist<ERHeaderStatusState>(
    (set) => ({
      erHeaderStatus: "not_submitted",
      erHeaderSubmitted: false,
      setERHeaderStatus: (status) => set({ erHeaderStatus: status }),
      setERHeaderSubmitted: (submitted) =>
        set({ erHeaderSubmitted: submitted }),
    }),
    {
      name: "er-header-status-store",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
