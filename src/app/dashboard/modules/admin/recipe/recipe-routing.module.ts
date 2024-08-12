import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeComponent } from './recipe.component';
import { AddEditComponent } from './components/add-edit/add-edit.component';

const routes: Routes = [{ path: '', component: RecipeComponent },
  {path:'add' , component:AddEditComponent},
  {path:'edit/:id' , component:AddEditComponent},
  {path:'view/:id' , component:AddEditComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipeRoutingModule { }
