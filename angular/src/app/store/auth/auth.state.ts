import { User } from '../../models/user.model';

export interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

export const initialAuthState: AuthState = {
  isLoggedIn: false,
  user: null,
  token: null,
  loading: false,
  error: null,
};
