import { computed, Injectable, signal } from '@angular/core';
import {
  Auth,
  GoogleAuthProvider,
  User,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from '@angular/fire/auth';
import { from } from 'rxjs';
import { serializeUser } from '../utils/serialize-user.util';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  provider = new GoogleAuthProvider();
  userSignal$ = signal<User | null>(null);
  isLoggedIn$ = computed(() => !!this.userSignal$());

  constructor(private auth: Auth) {
    onAuthStateChanged(this.auth, (firebaseUser) => {
      this.userSignal$.set(firebaseUser);
    });
  }

  signUp(email: string, password: string) {
    return from(createUserWithEmailAndPassword(this.auth, email, password));
  }

  signIn(email: string, password: string) {
    return from(
      signInWithEmailAndPassword(this.auth, email, password).then(
        (res) => res.user
      )
    );
  }

  signInWithGoolge() {
    return from(
      signInWithPopup(this.auth, this.provider).then((res) =>
        serializeUser(res.user)
      )
    );
  }

  signOut() {
    return from(signOut(this.auth));
  }

  getCurrentUserToken(forceRefresh = false): Promise<string> {
    const user = this.auth.currentUser;
    if (!user) return Promise.reject('No user logged in');
    return user.getIdToken(forceRefresh);
  }
}
