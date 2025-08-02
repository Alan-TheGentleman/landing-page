import { Component, inject } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-win95-back-button',
  imports: [],
  templateUrl: './win95-back-button.html',
  styleUrl: './win95-back-button.scss',
})
export class Win95BackButtonComponent {
  private location = inject(Location);
  private router = inject(Router);

  goBack(): void {
    // Verificar si podemos ir hacia atrás en el historial
    if (window.history.length > 1) {
      this.location.back();
    } else {
      // Si no hay historial, ir al home
      this.router.navigate(['/']);
    }
  }
}
