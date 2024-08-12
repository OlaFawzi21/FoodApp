import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { CategoryService } from './services/category.service';
import { Category } from './interfaces/category';
import { MatDialog } from '@angular/material/dialog';
import { AddEditComponent } from './components/add-edit/add-edit.component';
import { ToastrService } from 'ngx-toastr';
import { DeleteComponent } from 'src/app/shared/delete/delete.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  list?: Category;
  search: string = '';

  length = 50;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 50];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = false;
  disabled = false;

  pageEvent: PageEvent;

  constructor(
    private categoryService: CategoryService,
    public dialog: MatDialog,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getCategories();
  }

  // dialog
  openDialog(name?: string, id?: number, action?: string): void {
    const dialogRef = this.dialog.open(AddEditComponent, {
      data: { name: name, action: action },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
      if (result) {
        if (id) {
          this.onEditCategory(id, result);
        } else {
          this.onAddCategory(result);
        }
        this.getCategories();
      }
    });
  }

  openDeleteDialog(data: any): void {
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: { name: data.name, text: 'Category', id: data.id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
      if (result) {
        this.onDeleteCategory(result);
        this.getCategories();
      }
    });
  }

  // Funcs Category
  getCategories() {
    const params = {
      pageSize: this.pageSize,
      pageNumber: this.pageIndex + 1,
      name: this.search,
    };

    this.categoryService.getAllCategories(params).subscribe({
      next: (res: any) => {
        console.log('Response:', res);
        this.list = res;
      },
      error: (err) => {
        console.error('Error:', err);
      },
    });
  }

  onAddCategory(data: any) {
    this.categoryService.addCategory({ name: data }).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        this.toastr.error(err.error.message, 'Error');
      },
      complete: () => {
        this.toastr.success('Added Successful', 'Success');
      },
    });
  }

  onEditCategory(id: number, data: any) {
    console.log(data);
    this.categoryService.updateCategory(id, { name: data }).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        this.toastr.error(err.error.message, 'Error');
      },
      complete: () => {
        this.toastr.success('Edited Successful', 'Success');
        this.getCategories();
      },
    });
  }

  onDeleteCategory(id: number) {
    this.categoryService.deleteCategory(id).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        this.toastr.error(err.error.message, 'Error');
      },
      complete: () => {
        this.toastr.success('Deleted Successful', 'Success');
        this.getCategories();
      },
    });
  }

  // pagination
  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.getCategories();
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput
        .split(',')
        .map((str) => +str);
    }
  }
}
