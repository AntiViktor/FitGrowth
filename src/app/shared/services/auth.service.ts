import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { AlertController, NavController } from '@ionic/angular';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { User } from '../models/User';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private auth: Auth,
    private navController: NavController,
    private userService: UserService,
    private alertController: AlertController
  ) {
    this.auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        this.navController.navigateRoot('/tabs');
      } else {
        this.navController.navigateRoot('/login');
      }
    });
  }
  public async register(user: User, password: string) {
    await createUserWithEmailAndPassword(this.auth, user.email, password)
      .then((cred) => this.userService.createUser(user, cred.user.uid))
      .catch((error) => console.log(error));
  }

  async login(email: string, password: string) {
    try {
      const user = await signInWithEmailAndPassword(this.auth, email, password);
      return user;
    } catch (e) {
        const alert = await this.alertController.create({
          header: 'Login failed',
          buttons: ['OK'],
        });
        await alert.present();
        return null;
    }
  }

  logout() {
    return signOut(this.auth);
  }
}
