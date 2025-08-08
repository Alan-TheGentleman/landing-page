import { Component, inject, input, output } from '@angular/core';
import { SoundService } from '../../../services/sound.service';

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
  private soundService = inject(SoundService);

  type = input<HTMLButtonElement['type']>(BUTTON_TYPE_OPTIONS.button);
  clicked = output<void>();

  onClick(): void {
    this.soundService.play('button-click');
    this.clicked.emit();
  }
}
