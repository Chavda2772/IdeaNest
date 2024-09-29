import { Component, EventEmitter, inject, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-footer-navigation',
  standalone: true,
  imports: [MatButtonModule, MatTooltipModule],
  templateUrl: './footer-navigation.component.html'
})
export class FooterNavigationComponent {
  // Inject service
  router = inject(Router);

  // Variables
  @Output() addClickEvent = new EventEmitter();
  readonly dialog = inject(MatDialog);

  // Events
  onHomeClick() {
    this.router.navigate(['dashboard'])
  }

  onAddClick() {
    this.addClickEvent.emit();
  }

  onSettingsClick() {
    console.warn('PENDING')
  }
}
