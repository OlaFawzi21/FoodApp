import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { RecipeService } from './services/recipe.service';
import { Recipe } from './interfaces/recipe';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DeleteComponent } from 'src/app/shared/delete/delete.component';
import { CategoryService } from '../categories/services/category.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss'],
})
export class RecipeComponent {
  list?: Recipe;
  tags?: any;
  categories?: any;
  searchName: string = '';
  searchTag: string = '';
  searchCategory: string = '';

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
    private recipeService: RecipeService,
    private categoryService: CategoryService,
    public dialog: MatDialog,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getRecipes();
    this.getCategories();
    this.getTags();
  }

  // dialog
  OpenDeleteDialog(item: any) {
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: { name: item.name, text: 'Recipe', id: item.id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
      if (result) {
        this.onDeleteRecipe(result);
        this.getRecipes();
      }
    });
  }

  getRecipes() {
    const params = {
      pageSize: this.pageSize,
      pageNumber: this.pageIndex + 1,
      name: this.searchName,
      tagId: this.searchTag,
      categoryId: this.searchCategory,
    };

    this.recipeService.getAllRecipe(params).subscribe({
      next: (res: any) => {
        console.log('Response:', res);
        this.list = res;
      },
      error: (err) => {
        console.error('Error:', err);
      },
      complete: () => {
        console.log('Request completed');
      },
    });
  }

  getTags() {
    this.recipeService.allTag().subscribe({
      next: (res) => {
        console.log('Response TAgs:', res);
        this.tags = res;
      },
      error: (err) => {
        console.error('Error:', err);
      },
    });
  }

  getCategories() {
    this.categoryService
      .getAllCategories({ pageSize: 1000, pageNumber: 1 })
      .subscribe({
        next: (res) => {
          console.log('Response:', res);
          this.categories = res.data;
        },
        error: (err) => {
          console.error('Error:', err);
        },
      });
  }

  onDeleteRecipe(id: number) {
    this.recipeService.deleteRecipe(id).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        this.toastr.error(err.error.message, 'Error');
      },
      complete: () => {
        this.toastr.success('Deleted Successful', 'Success');
      },
    });
  }

  // pagination
  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.getRecipes();
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput
        .split(',')
        .map((str) => +str);
    }
  }

  onReset() {
    this.searchName = '';
    this.searchTag = '';
    this.searchCategory = '';
    this.getRecipes();
  }
}
