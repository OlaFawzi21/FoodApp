import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

interface IMenu {
  title: string,
  icon: string,
  link: string,
  isActive: boolean
}
@Component( {
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
} )


export class SidebarComponent {
  menu: IMenu[] = [
    {
      title: 'Home',
      icon: 'fa-solid fa-house',
      link: '/dashboard/home',
      isActive: true
    },
    {
      title: 'Users',
      icon: 'fa-solid fa-user-group',
      link: '/dashboard/users',
      isActive: this.isAdmin()
    },
    {
      title: 'Recipes',
      icon: 'fa-solid fa-vector-square',
      link: '/dashboard/recipes',
      isActive: this.isAdmin()
    },
    {
      title: 'Favorites',
      icon: 'fa-solid fa-heart',
      link: '1',
      isActive: this.isUser()
    },
    {
      title: 'User Recipes',
      icon: 'fa-solid fa-vector-square',
      link: '/dashboard/recipes',
      isActive: this.isUser()
    },
    {
      title: 'Categories',
      icon: 'fa-regular fa-calendar-days',
      link: '/dashboard/admin/categories',
      isActive: this.isAdmin()
    },
    {
      title: 'Change Password',
      icon: 'fa-solid fa-unlock-keyhole',
      link: '/dashboard/changePassword',
      isActive: true
    },
    {
      title: 'Logout',
      icon: 'fa-solid fa-arrow-right-from-bracket',
      link: '1',
      isActive: true
    },
  ];

  constructor( private _AuthService: AuthService ) { }
  ngOnInit() {

  }

  isAdmin() {
    return this._AuthService.role == 'SuperAdmin' ? true : false;
  }

  isUser() {
    return this._AuthService.role == 'SystemUser' ? true : false;
  }

  logout() {
    this._AuthService.logout();
  }
}
