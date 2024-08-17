import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ChangPass } from '../interfaces/changPass';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.scss'],
})
export class ChangePassComponent {
  changePassForm = new FormGroup({
    oldPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    newPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    confirmNewPassword: new FormControl('', [Validators.required]),
  });

  errMsg: string;
  errMsgControl: any;
  isHide: boolean = true;
  isHideNew: boolean = true;
  isHideConfirm: boolean = true;
  isLoading: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<ChangePassComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ChangPass
  ) {
    this.changePassForm.valueChanges.subscribe(() => {
      this.checkPasswords();
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  checkPasswords() {
    const newPassword = this.changePassForm.get('newPassword')?.value;
    const confirmPassword =
      this.changePassForm.get('confirmNewPassword')?.value;

    if (newPassword !== confirmPassword) {
      this.changePassForm
        .get('confirmNewPassword')
        ?.setErrors({ passwordsDoNotMatch: true });
    } else {
      this.changePassForm.get('confirmNewPassword')?.setErrors(null);
    }
  }
}
