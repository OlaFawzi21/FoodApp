import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AdminGuard } from '../core/Guards/admin.guard';
import { UserGuard } from '../core/Guards/user.guard';
import { HomeComponent } from './components/home/home.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'changePassword', component: ChangePasswordComponent },
      {
        path: 'admin',
        loadChildren: () =>
          import( './modules/admin/admin.module' ).then( ( m ) => m.AdminModule ),
        canActivate: [AdminGuard],
      },
      {
        path: 'user',
        loadChildren: () =>
          import( './modules/user/user.module' ).then( ( m ) => m.UserModule ),
        canActivate: [UserGuard],
      },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: '**', redirectTo: 'home', pathMatch: 'full' },
    ],
  },
];

@NgModule( {
  imports: [RouterModule.forChild( routes )],
  exports: [RouterModule],
} )
export class DashboardRoutingModule { }
