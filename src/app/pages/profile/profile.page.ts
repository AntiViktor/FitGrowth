import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/User';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  public user: Observable<User> 
  constructor(
    private authService: AuthService,
    private userService: UserService
    ) {
      this.user = userService.getCurrentUser();
     }

  ngOnInit() {
  }
  async logout(){
    await this.authService.logout();
  }
}
