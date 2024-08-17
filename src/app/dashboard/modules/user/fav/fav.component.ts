import { Component } from '@angular/core';
import { FavService } from 'src/app/dashboard/services/fav.service';
import { Recipe, RecipeItem } from '../../admin/recipe/interfaces/recipe';
import { PageEvent } from '@angular/material/paginator';
import { Fav, FavData } from './interfaces/fav';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-fav',
  templateUrl: './fav.component.html',
  styleUrls: ['./fav.component.scss'],
})
export class FavComponent {
  data?: Fav;
  recipes: FavData[];

  length = 50;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 50];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = false;
  disabled = false;

  pageEvent: PageEvent;

  constructor(private favService: FavService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.getFav();
  }

  getFav() {
    this.favService
      .onViewFav({
        pageSize: this.pageSize,
        pageNumber: this.pageIndex + 1,
      })
      .subscribe({
        next: (res) => {
          this.data = res;
          this.recipes = res.data;
          console.log(this.data);
        },
      });
  }

  onDeleteFav(id: number) {
    console.log(id);

    this.favService.onDeleteFav(id).subscribe({
      next: (res) => {},
      error: (err) => {
        this.toastr.error(err.message, 'Error');
      },
      complete: () => {
        this.toastr.success('Removed from fav successful', 'Success');
        this.getFav();
      },
    });
  }

  // pagination
  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.getFav();
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput
        .split(',')
        .map((str) => +str);
    }
  }
}
