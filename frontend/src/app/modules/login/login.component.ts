import { Component, Injectable, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../core/services/user.service';
import { ProxyBaseService } from '../../core/services/proxy-base.service';
import { NestOperationService } from '../../core/services/nest-operation.service';
import { Responsedata } from '../../core/models/responsedata.model';
import { LocalStorageConst } from '../../core/constants/LocalStorageConst';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  // Dependency Injection with constructor
  constructor(private router: Router, private userService: UserService) {}

  // Init
  ngOnInit() {}

  // Form variables
  Email: string = '';
  Password: string = '';

  // Methods
  async onFormSubmit() {
    let resData: any = await this.userService.LoginUser(
      this.Email,
      this.Password
    );

    // If Login
    if (resData.success) {
      localStorage.setItem(LocalStorageConst.TokenKey, resData.token);
      this.router.navigate(['dashboard']);
    } else {
      localStorage.removeItem(LocalStorageConst.TokenKey);
      alert(resData.msg);
    }
  }

  navigateToRegister() {
    this.router.navigate(['register']);
  }
}
