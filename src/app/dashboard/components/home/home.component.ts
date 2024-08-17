import { Component } from '@angular/core';
import { AuthService } from './../../../auth/services/auth.service';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  role: string | null;

  constructor(authService: AuthService) {
    this.role = authService.role;
  }
}
