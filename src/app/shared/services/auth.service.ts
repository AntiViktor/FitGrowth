import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { NavController } from '@ionic/angular';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private auth: Auth,
    private readonly navController: NavController
  ) {
    this.auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        this.navController.navigateRoot('/home');
      } else {
        this.navController.navigateRoot('/login');
      }
    });
  }
  public async register(email: string, password: string) {
    try {
      const user = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      return user;
    } catch (e) {
      return null;
    }
  }

  async login(email: string, password: string) {
    try {
      const user = await signInWithEmailAndPassword(this.auth, email, password);
      return user;
    } catch (e) {
      return null;
    }
  }

  logout() {
    return signOut(this.auth);
  }
}
