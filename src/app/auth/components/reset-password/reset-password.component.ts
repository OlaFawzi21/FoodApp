import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent {
  resetForm: FormGroup;
  errMsg: string;
  errMsgControl: any;
  isHide: boolean = true;
  isHideConfirm: boolean = true;
  isLoading: boolean = false;

  constructor(
    private _AuthService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.resetForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      seed: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });

    this.resetForm.valueChanges.subscribe(() => {
      this.checkPasswords();
    });
  }

  onResetPassword(data: FormGroup) {
    console.log(data);
    this.isLoading = true;
    this._AuthService.onResetPassword(data.value).subscribe({
      next: (res) => {},
      error: (err) => {
        this.errMsg = err.error.message;
        this.errMsgControl = err.error.additionalInfo;
        if (this.errMsgControl && this.errMsgControl.errors) {
          for (const control in this.errMsgControl.errors) {
            if (this.errMsgControl.errors[control]) {
              this.toastr.error(
                this.errMsgControl.errors[control][0],
                'Error',
                {
                  timeOut: 0,
                }
              );
            }
          }
        } else {
          this.toastr.error(this.errMsg, 'Error');
        }
        this.isLoading = false;
      },
      complete: () => {
        this.toastr.success('Login Successfully!', 'Success');
        this.isLoading = false;
        this.router.navigate(['/auth/login']);
      },
    });
  }

  checkPasswords() {
    const password = this.resetForm.get('password')?.value;
    const confirmPassword = this.resetForm.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      this.resetForm
        .get('confirmPassword')
        ?.setErrors({ passwordsDoNotMatch: true });
    } else {
      this.resetForm.get('confirmPassword')?.setErrors(null);
    }
  }
}
