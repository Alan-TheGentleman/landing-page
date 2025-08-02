import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-win95-header',
  imports: [],
  templateUrl: './win95-header.html',
  styleUrl: './win95-header.scss',
})
export class Win95HeaderComponent {
  @Input() title: string = '';
  @Input() type: 'section' | 'card' = 'section';
}
