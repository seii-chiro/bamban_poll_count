import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type ERHeaderStatus = "submitted" | "not_submitted" | "disabled";

interface ERHeaderStatusState {
  erHeaderStatus: ERHeaderStatus;
  erHeaderSubmitted: boolean;
  vpsErHeader: number | null;
  setERHeaderStatus: (status: ERHeaderStatus) => void;
  setERHeaderSubmitted: (submitted: boolean) => void;
  setVpsErHeader: (value: number) => void;
}

export const useERHeaderStatusStore = create(
  persist<ERHeaderStatusState>(
    (set) => ({
      vpsErHeader: null,
      erHeaderStatus: "not_submitted",
      erHeaderSubmitted: false,
      setVpsErHeader: (value) => set({ vpsErHeader: value }),
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
