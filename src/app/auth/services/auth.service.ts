import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '../interfaces/login';
import { jwtDecode } from 'jwt-decode';
import { DecodeToken } from '../interfaces/decodeToken';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ResetPassword } from '../interfaces/resetPassword';
import { Verify } from '../interfaces/verify';
@Injectable( {
  providedIn: 'root'
} )
export class AuthService {

  role: string | null;
  constructor( private _HttpClient: HttpClient) {
    if ( localStorage.getItem( 'userToken' ) !== null ) {
      this.getProfile();
    }
  }

  getProfile() {
    let token = localStorage.getItem( 'userToken' );
    if ( token ) {
      let decoded: DecodeToken = jwtDecode<DecodeToken>( token );
      localStorage.setItem( 'userEmail', decoded.userEmail );
      localStorage.setItem( 'userName', decoded.userName );
      localStorage.setItem( 'role', decoded.userGroup );
      this.getRole();

    } else {
      console.error( 'No token found in local storage' );
    }
  }

  getRole() {
    if ( localStorage.getItem( 'userToken' ) !== null && localStorage.getItem( 'role' ) !== null ) {
      this.role = localStorage.getItem( 'role' );
    }
  }

  onLogin( data: Login ): Observable<any> {
    return this._HttpClient.post( 'Users/Login', data );
  }

  onRegister( data: FormData ): Observable<any> {
    return this._HttpClient.post( 'Users/Register', data );
  }
  
  onVerifyAccount( data: Verify ): Observable<any> {
    return this._HttpClient.put( 'Users/verify', data );
  }
  
  onForgetPassword( data: Verify ): Observable<any> {
    return this._HttpClient.post( 'Users/Reset/Request', data );
  }

  onResetPassword(data:ResetPassword ): Observable<any> {
    return this._HttpClient.post( 'Users/Reset', data );
  }
}
