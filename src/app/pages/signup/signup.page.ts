import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage {
  public credentials: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private authService: AuthService,
    private router: Router
  ) {
    this.credentials = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      age: ['', [Validators.required, Validators.min(1), Validators.max(110)]],
      weight:['',[Validators.required,Validators.min(1), Validators.max(500)]],
      height:['',[Validators.required,Validators.min(1),Validators.max(300)]],
      activity:['',[Validators.required]]
    });
  }

  get email() {
    return this.credentials?.get('email');
  }

  get password() {
    return this.credentials?.get('password');
  }

  async register() {
    const { password, email, age, weight, height, activity } = this.credentials?.value;
    const loading = await this.loadingController.create();
    await loading.present();

    const user = await this.authService.register({ email, age, weight, height, activity }, password);
    await loading.dismiss();
  }

}
