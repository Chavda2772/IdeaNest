import { Component, inject, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { CommonFunctionsService } from '../../utility/common-functions.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatMenuModule],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
  // Input Configs
  @Input() Title = ''
  @Input() IsHomePage: boolean = false;

  // Inject
  commonFunctions = inject(CommonFunctionsService);
  userService = inject(UserService);

  ngOnInit(): void { }

  // Events
  onBackClick() {
    history.back();
  }
  onProfileClick() {
    console.warn("PENDING")
  }
  // Logout
  onLogoutClick(): void {
    this.commonFunctions.showconfirmMessage("Logout", "Are you sure want to logout?", "No", "Yes")
      .beforeClosed()
      .subscribe(result => {
        if (result == 'confirm')
          this.userService.Logout();
      })
  }
}
