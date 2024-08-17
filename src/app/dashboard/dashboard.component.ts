import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  isSidebarCollapsed: boolean = false;

  // Toggle the sidebar state
  toggleSidebar(data: boolean) {
    this.isSidebarCollapsed = data;
  }
}
