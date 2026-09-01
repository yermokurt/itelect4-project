import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '../types';

export type AuthUser = User;

interface AuthState {
  token: string | null;
  user: AuthUser | null;
  login: (token: string, userData: AuthUser) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      login: (token: string, userData: AuthUser) => set({ token, user: userData }),
      logout: () => set({ token: null, user: null }),
    }),
    {
      name: 'campus-auth',
      partialize: (state) => ({ token: state.token, user: state.user }),
    },
  ),
);
