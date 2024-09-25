import { User } from "../utils/data/type";

export interface EmailStoreState {
  email: string;
  setEmail: (email: string) => void;
}

export interface AuthTokenStoreState {
  token: string;
  setToken: (token: string) => void;
}

export interface UidStoreState {
  uid: string;
  setUid: (uid: string) => void;
}

export interface UserStoreState {
  user: User;
  setUser: (user: User) => void;
}
