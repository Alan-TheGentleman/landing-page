import { Component } from '@angular/core';
import { Win95TaskbarComponent, Win95WindowComponent } from '@shared/ui';

@Component({
  selector: 'app-layout',
  imports: [Win95WindowComponent, Win95TaskbarComponent],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {}
