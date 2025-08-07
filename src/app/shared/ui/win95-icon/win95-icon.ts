import { NgOptimizedImage } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-win95-icon',
  imports: [NgOptimizedImage],
  templateUrl: './win95-icon.html',
  styleUrl: './win95-icon.scss',
})
export class Win95IconComponent {
  @Input() type: 'folder' | 'file' | 'image' = 'folder';
  @Input() title: string = '';
  @Input() image?: string;
  @Input() selected: boolean = false;
  @Output() clicked = new EventEmitter<void>();
  @Output() doubleClicked = new EventEmitter<void>();

  onSingleClick() {
    this.clicked.emit();
  }

  onDoubleClick() {
    this.doubleClicked.emit();
  }
}
