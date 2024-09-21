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
  userService = inject(UserService);
  router = inject(Router);
  commonFunctionsService = inject(CommonFunctionsService);

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

  onProfileClick() {
    console.warn('PENDING')
  }

  // Logout
  onLogoutClick(): void {
    this.commonFunctionsService.showconfirmMessage("Logout", "Are you sure want to logout?", "No", "Yes")
      .beforeClosed()
      .subscribe(result => {
        if (result == 'confirm')
          this.userService.Logout();
      })
  }
}
