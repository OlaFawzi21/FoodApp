import { Component } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  access_token: string;
  errMsg: string;
  isHide: boolean = true;
  isLoading: boolean = false;

  constructor(private _AuthService: AuthService ,private toastr: ToastrService , private router:Router) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    } );
  }

  onLogin(data: FormGroup) {
    console.log(data);
    this.isLoading = true;
    this._AuthService.onLogin(data.value).subscribe({
      next: (res) => {
        localStorage.setItem( "userToken", res.token );
        this._AuthService.getProfile();
      },
      error: (err) => {
        this.errMsg = err.error.message;
        this.toastr.error( this.errMsg, 'Error' );
        this.isLoading = false;
      },
      complete: () => {
        this.toastr.success( 'Login Successfully!', 'Success' );
        this.isLoading = false;
        this.router.navigate( ['/dashboard'] );
      }
    });
  }

  togglePasswordVisibility() {
    this.isHide = !this.isHide;
  }
}
