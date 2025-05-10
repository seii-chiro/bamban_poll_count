import { create } from "zustand";

type Role =
  | "admin"
  | "candidate"
  | "pollwatcher"
  | "superadmin"
  | "legalofficer"
  | "leadpollwatcher"
  | null;

interface UserState {
  username: string | null;
  role: Role;
  setUser: (username: string, role: Role) => void;
  clearUser: () => void;
}

const useUserStore = create<UserState>((set) => ({
  username: null,
  role: null,
  setUser: (username, role) => set({ username, role }),
  clearUser: () => set({ username: "", role: null }),
}));

export default useUserStore;
