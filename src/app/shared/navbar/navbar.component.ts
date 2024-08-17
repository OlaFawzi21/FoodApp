import { Component } from '@angular/core';
import { LogoutService } from '../services/logout.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  username = localStorage.getItem('userName');

  constructor(
    private logoutService: LogoutService,
  ) { }
  
  logout() {
    this.logoutService.OpenLogoutDialog();
  }

}
