import { Bookmark, Review, User } from '../utils/data/type';

export interface EmailStoreState {
  email: string;
  setEmail: (email: string) => void;
  clearEmail: () => void;
}

export interface AuthTokenStoreState {
  token: string;
  setToken: (token: string) => void;
  clearToken: () => void;
}

export interface UidStoreState {
  uid: string;
  setUid: (uid: string) => void;
  clearUid: () => void;
}

export interface UserStoreState {
  user: User;
  setUser: (user: User) => void;
  setUpdatePhotoURL: (photoURL: string | null) => void;
  clearUser: () => void;
  clearUpdatePhotoURL: () => void;
}

export interface ReviewStoreState {
  reviews: Review[];
  setReviews: (reviews: Review[]) => void;
  clearReviews: () => void;
}

export interface MyReviewStoreState {
  myreviews: Review[];
  setMyReviews: (reviews: Review[]) => void;
  clearMyReviews: () => void;
}

export interface BookmarkStoreState {
  bookmark: Bookmark;
  isBookmarked: boolean;
  setBookmark: (bookmark: Bookmark, isBookmarked: boolean) => void;
  toggleBookmark: () => void;
  clearBookmark: () => void;
}
