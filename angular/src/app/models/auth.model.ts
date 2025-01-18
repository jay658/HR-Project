import { User } from "./user.model";

export interface AuthState {
    isLoggedIn: boolean;
    user: User | null;
    token: string | null;
    loading: boolean;
    error: string | null;
  }