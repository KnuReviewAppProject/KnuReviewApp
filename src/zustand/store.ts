import { create } from 'zustand';
import { Review, User } from '../utils/data/type';
import {
  AuthTokenStoreState,
  EmailStoreState,
  MyReviewStoreState,
  ReviewStoreState,
  UidStoreState,
  UserStoreState,
} from './state';

export const useEmailStore = create<EmailStoreState>(set => ({
  email: '',
  setEmail: (email: string) => set({email}),
  clearEmail: () => set({email: ''}),
}));

export const useAuthTokenStore = create<AuthTokenStoreState>(set => ({
  token: '',
  setToken: (token: string) => set({token}),
  clearToken: () => set({token: ''}),
}));

export const useUidStore = create<UidStoreState>(set => ({
  uid: '',
  setUid: (uid: string) => set({uid}),
  clearUid: () => set({uid: ''}),
}));

export const useUserStore = create<UserStoreState>(set => ({
  user: {
    accessToken: '',
    uid: '',
    email: '',
    nickname: '',
    photoURL: '',
  },
  setUser: (user: User) => set({user}),
  setUpdatePhotoURL: (photoURL: string | null) =>
    set(state => ({
      user: {
        ...state.user,
        photoURL: photoURL,
      },
    })),
  clearUser: () =>
    set({
      user: {
        accessToken: '',
        uid: '',
        email: '',
        nickname: '',
        photoURL: null,
      },
    }),
  clearUpdatePhotoURL: () =>
    set(state => ({
      user: {
        ...state.user,
        photoURL: null,
      },
    })),
}));

export const useReviewStore = create<ReviewStoreState>(set => ({
  reviews: [],
  setReviews: (reviews: Review[]) => set({reviews}),
  clearReviews: () => set({reviews: []}),
}));

export const useMyReviewStore = create<MyReviewStoreState>(set => ({
  myreviews: [],
  setMyReviews: (myreviews: Review[]) => set({myreviews}),
  clearMyReviews: () => set({myreviews: []}),
}));
