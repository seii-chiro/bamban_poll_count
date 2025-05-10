import { create } from "zustand";

type Role =
  | "admin"
  | "candidate"
  | "poll-watcher"
  | "superadmin"
  | "legalofficer"
  | "leadpollwatcher"
  | null;

interface UserState {
  username: string | null;
  role: Role;
  precinctDetails: string | number | null;
  setUser: (username: string, role: Role) => void;
  clearUser: () => void;
}

const useUserStore = create<UserState>((set) => ({
  username: "John",
  role: "admin",
  precinctDetails: null,
  setUser: (username, role) => set({ username, role }),
  clearUser: () => set({ username: null, role: null, precinctDetails: null }),
}));

export default useUserStore;
