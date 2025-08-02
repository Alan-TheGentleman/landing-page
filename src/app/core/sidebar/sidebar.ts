import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Button } from '@shared/ui';

@Component({
  selector: 'app-sidebar',
  imports: [Button],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
  standalone: true,
})
export class Sidebar {
  constructor(private router: Router) {}

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}
