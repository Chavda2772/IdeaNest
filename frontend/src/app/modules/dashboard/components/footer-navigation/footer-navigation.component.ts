import { Component, inject } from '@angular/core';
import { UserService } from '../../../../core/services/user.service';
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

  // Logout
  onLogout() {
    this.userService.Logout();
  }

  // Add Dialog
  openDialog() {
    this.router.navigate(['add'])
  }
}
