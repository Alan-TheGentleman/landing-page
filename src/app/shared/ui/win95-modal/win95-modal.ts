import { CommonModule } from '@angular/common';
import { Component, EventEmitter, input, Output } from '@angular/core';

@Component({
  selector: 'app-win95-modal',
  imports: [CommonModule],
  templateUrl: './win95-modal.html',
  styleUrl: './win95-modal.scss',
})
export class Win95ModalComponent {
  title = input<string>('');
  isOpen = input<boolean>(false);

  @Output() closeModal = new EventEmitter<void>();

  onClose(): void {
    this.closeModal.emit();
  }

  onBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.onClose();
    }
  }
}
