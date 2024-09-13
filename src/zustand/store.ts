import { create } from 'zustand';
import { AuthTokenStoreState, EmailStoreState } from './state';

export const useEmailStore = create<EmailStoreState>(set => ({
  email: '',
  setEmail: (email: string) => set({email}),
}));

export const useAuthTokenStore = create<AuthTokenStoreState>(set => ({
  token: '',
  setToken: (token: string) => set({token}),
}));
