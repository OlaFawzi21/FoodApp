import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable( {
  providedIn: 'root',
} )
export class AdminGuard implements CanActivate {
  constructor( private router: Router, private authService: AuthService ) { }

  canActivate(): boolean {

    if ( localStorage.getItem( 'userToken' ) !== null && this.authService.role == 'SuperAdmin' ) {
      return true;
    } else {
      this.router.navigate( ['/dashboard'] );
      return false;
    }
  }
}
