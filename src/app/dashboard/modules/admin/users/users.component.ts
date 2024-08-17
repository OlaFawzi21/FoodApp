import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DeleteComponent } from 'src/app/shared/delete/delete.component';
import { user, Users } from './interfaces/users';
import { UsersService } from './services/users.service';
import { ViewComponent } from './components/view/view.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  list?: Users;
  search: string = '';
  searchType: string = '';
  role: string = '';
  openView: boolean = false;

  length = 50;
  pageSize = 50;
  pageIndex = 0;
  pageSizeOptions = [50, 100, 200, 300, 500, 1000];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = false;
  disabled = false;

  pageEvent: PageEvent;

  constructor(
    private usersService: UsersService,
    public dialog: MatDialog,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  // dialog
  OpenDeleteDialog(user: user) {
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: { name: user.userName, text: 'User', id: user.id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
      if (result) {
        this.onDeleteRecipe(result);
        this.getUsers();
      }
    });
  }

  OpenViewDialog(user: user) {
    const dialogRef = this.dialog.open(ViewComponent, {
      data: user,
      width: '60%',
    } );
  }

  getUsers() {
    this.usersService
      .getAllUsers({
        pageSize: this.pageSize,
        pageNumber: this.pageIndex + 1,
        [this.searchType]: this.search,
        groups: this.role,
      })
      .subscribe({
        next: (res) => {
          console.log('Response:', res);
          this.list = res;
        },
        error: (err) => {
          console.error('Error:', err);
        },
      });
  }

  onDeleteRecipe(id: number) {
    this.usersService.deleteUser(id).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        this.toastr.error(err.error.message, 'Error');
      },
      complete: () => {
        this.toastr.success('Deleted Successful', 'Success');
        this.getUsers();
      },
    });
  }

  // pagination
  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.getUsers();
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput
        .split(',')
        .map((str) => +str);
    }
  }
}
