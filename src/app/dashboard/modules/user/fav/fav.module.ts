import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FavRoutingModule } from './fav-routing.module';
import { FavComponent } from './fav.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    FavComponent
  ],
  imports: [
    CommonModule,
    FavRoutingModule,
    SharedModule
  ]
})
export class FavModule { }
