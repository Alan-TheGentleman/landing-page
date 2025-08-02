import { Component, input, output } from '@angular/core';

const BUTTON_TYPE_OPTIONS = {
  button: 'button',
  submit: 'submit',
  reset: 'reset',
} as const;

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.scss',
})
export class Button {
  type = input<HTMLButtonElement['type']>(BUTTON_TYPE_OPTIONS.button);
  clicked = output<void>();

  onClick(): void {
    this.clicked.emit();
  }
}
