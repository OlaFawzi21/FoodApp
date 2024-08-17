import { Injectable } from '@angular/core';
import { LogoutComponent } from '../logout/logout.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

constructor(
  public dialog: MatDialog, private toastr: ToastrService, private _Router:Router) { }
  
OpenLogoutDialog() {
  const dialogRef = this.dialog.open( LogoutComponent, {
    data:{}
  });

  dialogRef.afterClosed().subscribe((result) => {
    if ( result ) {
      this.logout();
      console.log(result);
      
    }
  });
}

  
logout() {
  localStorage.removeItem( 'userToken' );
  localStorage.removeItem( 'userEmail' );
  localStorage.removeItem( 'userName' );
  localStorage.removeItem( 'role' );
  this.toastr.success( 'Logout Successfully!', 'Success' );
  this._Router.navigate( ['/auth'] );
}

}
