import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ChangePassService } from './../services/changePass.service';

interface IMenu {
  title: string;
  icon: string;
  link?: string;
  isActive: boolean;
  action?: string;
}
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  @Output() toggle: EventEmitter<boolean> = new EventEmitter<boolean>();

  toggler: boolean = false;

  sendData() {
    this.toggler = !this.toggler;
    this.toggle.emit(this.toggler);
  }

  menu: IMenu[] = [
    {
      title: 'Home',
      icon: 'fa-solid fa-house',
      link: '/dashboard/home',
      isActive: true,
    },
    {
      title: 'Categories',
      icon: 'fa-regular fa-calendar-days',
      link: '/dashboard/admin/categories',
      isActive: this.isAdmin(),
    },
    {
      title: 'Recipes',
      icon: 'fa-solid fa-vector-square',
      link: '/dashboard/admin/recipe',
      isActive: this.isAdmin(),
    },
    {
      title: 'User Recipes',
      icon: 'fa-solid fa-vector-square',
      link: '/dashboard/user/userRecipe',
      isActive: this.isUser(),
    },
    {
      title: 'Favorites',
      icon: 'fa-solid fa-heart',
      link: '/dashboard/user/fav',
      isActive: this.isUser(),
    },
    {
      title: 'Users',
      icon: 'fa-solid fa-user-group',
      link: '/dashboard/admin/users',
      isActive: this.isAdmin(),
    },
    {
      title: 'Change Password',
      icon: 'fa-solid fa-unlock-keyhole',
      isActive: true,
      action: 'changePass',
    },
  ];

  constructor(
    private _AuthService: AuthService,
    private changePassService: ChangePassService
  ) {}
  ngOnInit() {}

  changePass() {
    this.changePassService.openDialog();
  }

  isAdmin() {
    return this._AuthService.role == 'SuperAdmin' ? true : false;
  }

  isUser() {
    return this._AuthService.role == 'SystemUser' ? true : false;
  }

  handleClick(action: string): void {
    if (action === 'changePass') {
      this.changePass();
    }
  }
}
