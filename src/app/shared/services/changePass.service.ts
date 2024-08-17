import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChangPass } from '../interfaces/changPass';
import { ToastrService } from 'ngx-toastr';
import { ChangePassComponent } from '../chnage-pass/change-pass.component';

@Injectable({
  providedIn: 'root',
})
export class ChangePassService {
  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    private toaster: ToastrService
  ) {}

  resMsg: any;
  errMsg: string;

  openDialog() {
    const dialogRef = this.dialog.open(ChangePassComponent, {
      data: {},
      width: '50%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
      if (result) {
        this.onChangePassword(result).subscribe({
          next: (res) => {
            this.resMsg = res;
          },
          error: (err) => {
            this.errMsg = err.error.message;
            const errMsgControl = err.error.additionalInfo;
            if (errMsgControl && errMsgControl.errors) {
              for (const control in errMsgControl.errors) {
                if (errMsgControl.errors[control]) {
                  this.toaster.error(
                    errMsgControl.errors[control][0],
                    'Error',
                    {
                      timeOut: 0,
                    }
                  );
                }
              }
            } else {
              this.toaster.error(this.errMsg, 'Error');
            }
          },
          complete: () => {
            this.toaster.success(this.resMsg.message);
          },
        });
      }
    });
  }

  onChangePassword(data: ChangPass) {
    return this.http.put('Users/ChangePassword/', data);
  }
}
