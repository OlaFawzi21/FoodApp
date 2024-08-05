import { Component } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component( {
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
} )
export class ForgetPasswordComponent {
  forgetForm: FormGroup;
  errMsg: string;
  isLoading: boolean = false;

  constructor( private _AuthService: AuthService, private toastr: ToastrService, private router: Router ) {
    this.forgetForm = new FormGroup( {
      email: new FormControl( '', [Validators.required, Validators.email] )
    } );
  }

  onForgetPassword( data: FormGroup ) {
    console.log( data );
    this.isLoading = true;
    this._AuthService.onForgetPassword( data.value ).subscribe( {
      next: ( res ) => {
        console.log( res );

      },
      error: ( err ) => {
        this.errMsg = err.error.message;
        this.toastr.error( this.errMsg, 'Error' );
        this.isLoading = false;
      },
      complete: () => {
        this.toastr.success( 'Your request is being processed, please check your email', 'Success' );
        this.isLoading = false;
        this.router.navigate( ['/auth/resetPassword'] );
      }
    } );
  }
}
