import { create } from 'zustand';
import { EmailStoreState } from './state';

export const useEmailStore = create<EmailStoreState>(set => ({
  email: '',
  setEmail: (email: string) => set({email}),
}));
