import { User } from 'firebase/auth';
import { UserModel } from '../app.models';

export function serializeUser(user: User): UserModel {
  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    isAnonymous: user.isAnonymous,
    emailVerified: user.emailVerified,
  };
}
