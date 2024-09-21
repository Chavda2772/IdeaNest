import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../core/services/user.service';
import { LocalStorageConst } from '../../core/constants/LocalStorageConst';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  // Dependency Injection with constructor
  constructor(private userService: UserService) { }

  // Inject
  router = inject(Router);

  // Init
  ngOnInit() {
    // Fetch user details and validate Token
   }

  // Form variables
  Email: string = '';
  Password: string = '';

  // Methods
  async onFormSubmit() {
    let resData = await this.userService.LoginUser({ Email: this.Email, Password: this.Password })

    if (resData.success) {
      localStorage.setItem(LocalStorageConst.TokenKey, resData.token ?? '');
      this.router.navigate(['dashboard']);
      return;
    }
    else {
      localStorage.removeItem(LocalStorageConst.TokenKey);
      console.error(resData.msg);
      alert(resData.msg);
    }
  }

  navigateToRegister() {
    this.navigateTo('register');
  }

  navigateTo(name: string) {
    this.router.navigate([name]);
  }
}
