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

interface UserState {
  id: number | null;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  role: Role;
  setUser: (user: {
    id: number;
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
      id: null,
      email: null,
      firstName: null,
      lastName: null,
      role: null,
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
    }),
    {
      name: "user-store",
    }
  )
);

export default useUserStore;
