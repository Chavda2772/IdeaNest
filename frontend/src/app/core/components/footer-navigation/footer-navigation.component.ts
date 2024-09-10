import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer-navigation',
  standalone: true,
  imports: [],
  templateUrl: './footer-navigation.component.html',
  styleUrl: './footer-navigation.component.css'
})
export class FooterNavigationComponent {
  // Inject service
  userService = inject(UserService);
  router = inject(Router);

  // Events
  onHomeClick() {
    this.router.navigate(['dashboard'])
  }

  onAddClick() {
    this.router.navigate(['add'])
  }

  onSettingsClick() {
    console.warn('PENDING')
  }

  onProfileClick() {
    console.warn('PENDING')
  }

  // Logout
  onLogoutClick() {
    this.userService.Logout();
  }
}
