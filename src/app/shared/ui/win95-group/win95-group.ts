import { Component, Input } from '@angular/core';
import { Win95HeaderComponent } from '../win95-header/win95-header';

@Component({
  selector: 'app-win95-group',
  imports: [Win95HeaderComponent],
  templateUrl: './win95-group.html',
  styleUrl: './win95-group.scss',
})
export class Win95GroupComponent {
  @Input() title?: string;
}
