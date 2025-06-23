import { User } from '@angular/fire/auth';

export interface AuthState {
  user: User | UserModel | null;
  loading: boolean;
  error?: any;
}

export const initialAuthState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

export interface UserModel {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  isAnonymous: boolean;
  emailVerified: boolean;
}
