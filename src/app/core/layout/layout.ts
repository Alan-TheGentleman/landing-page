import { Component } from '@angular/core';
import { Button, Card } from '@shared/ui';
import { Sidebar } from '../sidebar/sidebar';

@Component({
  selector: 'app-layout',
  imports: [Card, Sidebar, Button],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {}
