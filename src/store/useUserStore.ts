import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Role =
  | "admin"
  | "candidate"
  | "poll-watcher"
  | "superadmin"
  | "legalofficer"
  | "leadpollwatcher"
  | "user"
  | null;

export interface PollingPlace {
  acm_id: string;
  brgy_name: string;
  clustered_prec: string;
  created_at: string;
  created_by: string;
  id: number;
  mun_name: string;
  notes: string | null;
  pollplace: string;
  prv_name: string;
  record_status: string;
  reg_name: string;
  registered_voters: number;
  updated_at: string;
  updated_by: string | null;
}

interface UserState {
  id: number | null;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  role: Role;
  clustered_prec_precincts: PollingPlace | null;
  setUser: (user: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    role: Role;
  }) => void;
  clearUser: () => void;
  setPollingPlace: (pollingPlace: PollingPlace) => void;
  clearPollingPlace: () => void;
}

const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      id: null,
      email: null,
      firstName: null,
      lastName: null,
      role: null,
      clustered_prec_precincts: null,
      setUser: ({ email, firstName, lastName, role, id }) =>
        set({ email, firstName, lastName, role, id }),
      clearUser: () =>
        set({
          email: null,
          firstName: null,
          lastName: null,
          role: null,
          id: null,
        }),
      setPollingPlace: (pollingPlace) =>
        set({ clustered_prec_precincts: pollingPlace }),
      clearPollingPlace: () => set({ clustered_prec_precincts: null }),
    }),
    {
      name: "user-store",
    }
  )
);

export default useUserStore;
