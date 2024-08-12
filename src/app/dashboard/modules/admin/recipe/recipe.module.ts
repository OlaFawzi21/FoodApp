import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipeRoutingModule } from './recipe-routing.module';
import { RecipeComponent } from './recipe.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddEditComponent } from './components/add-edit/add-edit.component';

@NgModule({
  declarations: [RecipeComponent, AddEditComponent],
  imports: [CommonModule, RecipeRoutingModule, SharedModule],
})
export class RecipeModule {}
