import { Component, EventEmitter, inject, Output } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { CommonFunctionsService } from '../../utility/common-functions.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-footer-navigation',
  standalone: true,
  imports: [],
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
