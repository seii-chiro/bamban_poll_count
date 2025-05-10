import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Role =
  | "admin"
  | "candidate"
  | "poll-watcher"
  | "superadmin"
  | "legalofficer"
  | "leadpollwatcher"
  | null;

interface UserState {
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  role: Role;
  setUser: (user: {
    email: string;
    firstName: string;
    lastName: string;
    role: Role;
  }) => void;
  clearUser: () => void;
}

const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      email: null,
      firstName: null,
      lastName: null,
      role: null,
      setUser: ({ email, firstName, lastName, role }) =>
        set({ email, firstName, lastName, role }),
      clearUser: () =>
        set({ email: null, firstName: null, lastName: null, role: null }),
    }),
    {
      name: "user-store",
    }
  )
);

export default useUserStore;
