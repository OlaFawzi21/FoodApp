import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRecipeRoutingModule } from './user-recipe-routing.module';
import { UserRecipeComponent } from './user-recipe.component';
import { ViewComponent } from './components/view/view.component';
import { SharedModule } from 'src/app/shared/shared.module';
ViewComponent

@NgModule({
  declarations: [
    UserRecipeComponent,
    ViewComponent
  ],
  imports: [
    CommonModule,
    UserRecipeRoutingModule,
    SharedModule
  ]
})
export class UserRecipeModule { }
