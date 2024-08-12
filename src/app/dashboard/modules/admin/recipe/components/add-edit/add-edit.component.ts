import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../../../categories/services/category.service';
import { RecipeService } from '../../services/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss'],
})
export class AddEditComponent {
  formRecipe = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    price: new FormControl(null, [Validators.required, Validators.min(0)]),
    categoriesIds: new FormControl('', Validators.required),
    tagId: new FormControl('', Validators.required),
  });

  matcher = new MyErrorStateMatcher();

  tags: any[] = [];
  categories: any[] = [];
  files: File[] = [];
  imgSource: any;

  id: number;

  tagId: any;
  categoryId: any;

  isViewMode: boolean = false;

  constructor(
    private recipeService: RecipeService,
    private categoryService: CategoryService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getTags();
    this.getCategories();
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.loadRecipe(this.id);
      this.checkRoute();
    }
  }

  // check mode view or edit to disable inputs or enable
  checkRoute(): void {
    const currentRoute = this.router.url;
    if (currentRoute.includes('view')) {
      this.isViewMode = true;
      this.formRecipe.disable();
    } else {
      this.isViewMode = false;
      this.formRecipe.enable();
    }
  }

  // Funcs
  getTags() {
    this.recipeService.allTag().subscribe({
      next: (res) => {
        console.log('Response Tags:', res);
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

  onSubmit() {
    if (this.formRecipe.valid) {
      const formData = new FormData();
      Object.keys(this.formRecipe.controls).forEach((key) => {
        formData.append(key, this.formRecipe.get(key)!.value);
      });
      if (this.imgSource) {
        formData.append('recipeImage', this.imgSource);
      }

      formData.forEach((ele, key) => {
        console.log(key + ' : ' + ele);
      });

      if (this.id) {
        this.recipeService.updateRecipe(this.id, formData).subscribe({
          next: (res) => {
            console.log(res);
          },
          error: (err) => {
            this.toastr.error(err.error.message, 'Error');
          },
          complete: () => {
            this.toastr.success('Recipe updated successfully', 'Success');
            this.router.navigate(['/dashboard/admin/recipe']);
          },
        });
      } else {
        this.recipeService.addRecipe(formData).subscribe({
          next: (res) => {
            console.log(res);
          },
          error: (err) => {
            this.toastr.error(err.error.message, 'Error');
          },
          complete: () => {
            this.toastr.success('Recipe added successfully', 'Success');
            this.router.navigate(['/dashboard/admin/recipe']);
          },
        });
      }
    }
  }

  loadRecipe(id: number) {
    this.recipeService.getRecipe(id).subscribe({
      next: (res) => {
        console.log(res);

        this.formRecipe.patchValue(res);
        this.formRecipe.patchValue({ tagId: res.tag.id });
        this.formRecipe
          .get('categoriesIds')
          ?.setValue(res.category.map((category: any) => category.id));

        this.createFileFromImagePath(
          'https://upskilling-egypt.com:3006/' + res.imagePath
        ).then((file) => {
          if (file) {
            this.files.push(file);
          }
        });
      },
      error: (err) => {
        console.error('Error:', err);
      },
    });
  }

  // Photo
  onSelect(event: any) {
    console.log(event);
    this.files.push(...event.addedFiles);
    this.imgSource = this.files[0];
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  // to preview img in view/edit mode
  async createFileFromImagePath(imagePath: string): Promise<File | null> {
    const response = await fetch(imagePath);
    const blob = await response.blob();
    const filename = imagePath.split('/').pop() || 'existing-image.jpg';
    return new File([blob], filename, { type: blob.type });
  }
}
