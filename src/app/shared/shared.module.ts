import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponent } from './shared.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { DeleteComponent } from './delete/delete.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { ChangePassComponent } from './chnage-pass/change-pass.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { LogoutComponent } from './logout/logout.component';
@NgModule({
  declarations: [
    SharedComponent,
    NavbarComponent,
    SidebarComponent,
    DeleteComponent,
    SpinnerComponent,
    ChangePassComponent,
    LogoutComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgxDropzoneModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatPaginatorModule,
    MatMenuModule,
    MatIconModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule
  ],
  exports: [
    NavbarComponent,
    SidebarComponent,
    DeleteComponent,
    RouterModule,
    NgxDropzoneModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatPaginatorModule,
    MatMenuModule,
    MatIconModule,
    MatSelectModule,
    ReactiveFormsModule,
    SpinnerComponent,
    MatProgressSpinnerModule
  ],
})
export class SharedModule {}
