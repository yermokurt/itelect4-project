import { create } from 'zustand';

export interface AuthUser {
  name: string;
  email: string;
}

interface AuthState {
  token: string | null;
  user: AuthUser | null;
  login: (token: string, userData: AuthUser) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  login: (token: string, userData: AuthUser) => set({ token, user: userData }),
  logout: () => set({ token: null, user: null }),
}));
