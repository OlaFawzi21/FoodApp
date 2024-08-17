import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { RecipeService } from '../../admin/recipe/services/recipe.service';
import { CategoryService } from '../../admin/categories/services/category.service';
import { Recipe, RecipeItem } from '../../admin/recipe/interfaces/recipe';
import { ViewComponent } from './components/view/view.component';
import { FavService } from 'src/app/dashboard/services/fav.service';

@Component({
  selector: 'app-user-recipe',
  templateUrl: './user-recipe.component.html',
  styleUrls: ['./user-recipe.component.scss'],
})
export class UserRecipeComponent {
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
    private favService: FavService,
    public dialog: MatDialog,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getRecipes();
    this.getCategories();
    this.getTags();
  }

  getRecipes() {
    const params = {
      pageSize: this.pageSize,
      pageNumber: this.pageIndex + 1,
      name: this.searchName.toLowerCase(),
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

  // dialog
  openViewDialog(recipe: RecipeItem) {
    const dialogRef = this.dialog.open(ViewComponent, {
      data: recipe,
      width: '60%',
    });
  }

  addFav(id: number) {
    this.favService.onAddFav(id).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        this.toastr.success('Added to fav successful', 'Success');
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
}
