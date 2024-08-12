import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { VerifyComponent } from '../verify/verify.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';


@Component( {
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
} )
export class RegisterComponent {
  registerForm: FormGroup;
  errMsg: string;
  errMsgControl: any;
  imgSource: any;
  isLoading: boolean = false;
  isHide: boolean = true;
  isHideConfirm: boolean = true;
  code: string;

  constructor( private _AuthService: AuthService, private toastr: ToastrService, private router: Router, public dialog: MatDialog ) {
    this.registerForm = new FormGroup( {
      userName: new FormControl( '', [Validators.required, Validators.minLength( 4 )] ),
      country: new FormControl( '', [Validators.required] ),
      phoneNumber: new FormControl( '', [Validators.required, Validators.pattern( '^01[0125][0-9]{8}$' )] ),
      email: new FormControl( '', [Validators.required, Validators.email] ),
      password: new FormControl( '', [Validators.required, Validators.minLength( 6 )] ),
      confirmPassword: new FormControl( '', [Validators.required] )
    } );

    this.registerForm.valueChanges.subscribe(() => {
      this.checkPasswords();
    });
      
  }



checkPasswords() {
  const password = this.registerForm.get('password')?.value;
  const confirmPassword = this.registerForm.get('confirmPassword')?.value;

  if (password !== confirmPassword) {
    this.registerForm.get('confirmPassword')?.setErrors({ passwordsDoNotMatch: true });
  } else {
    this.registerForm.get('confirmPassword')?.setErrors(null);
  }
}
  

  openDialog(): void {
    const dialogRef = this.dialog.open( VerifyComponent, {
      data: { email: this.registerForm.value.email, code: this.code },
    } );

    dialogRef.afterClosed().subscribe( result => {
      if ( result ) {
        this.onVerify( result );
      }
    } );
  }

  onVerify( data: any ) {
    this._AuthService.onVerifyAccount( data ).subscribe( {
      next: ( res ) => {
        console.log( res );
      },
      error: ( err ) => {
        this.toastr.error( err.error.message, 'Error' );
      },
      complete: () => {
        this.toastr.success( 'Account Activate Successfully!', 'Success' );
        this.router.navigate( ['/auth/login'] );
      }
    } );
  }

  onRegister( data: FormGroup ) {
    let formData = new FormData();
    formData.append( 'userName', data.value.userName );
    formData.append( 'country', data.value.country );
    formData.append( 'phoneNumber', data.value.phoneNumber );
    formData.append( 'email', data.value.email );
    formData.append( 'password', data.value.password );
    formData.append( 'confirmPassword', data.value.confirmPassword );
    formData.append( 'profileImage', this.imgSource );
    this.isLoading = true;
    this._AuthService.onRegister( formData ).subscribe( {
      next: ( res ) => {
      },
      error: ( err ) => {
        this.errMsg = err.error.message;
        this.errMsgControl = err.error.additionalInfo
        if ( this.errMsgControl && this.errMsgControl.errors ) {
          for ( const control in this.errMsgControl.errors ) {
            if ( this.errMsgControl.errors[control] ) {
              this.toastr.error( this.errMsgControl.errors[control][0], 'Error', {
                timeOut: 0
              } );
            }
          }
        }
        else {
          this.toastr.error( this.errMsg, 'Error' );
        }
        this.isLoading = false;
      },
      complete: () => {
        this.toastr.success( 'Register Successfully! A verification code has been sent to your email address.', 'Success' );
        this.isLoading = false;
        this.openDialog();
      }
    } );
  }


  files: File[] = [];

  onSelect( event: any ) {
    console.log( event );
    this.files.push( ...event.addedFiles );
    this.imgSource = this.files[0];
  }

  onRemove( event: any ) {
    console.log( event );
    this.files.splice( this.files.indexOf( event ), 1 );
  }

}