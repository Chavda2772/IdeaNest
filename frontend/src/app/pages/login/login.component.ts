import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../core/services/user.service';
import { LocalStorageConst } from '../../core/constants/LocalStorageConst';
import { CommonFunctionsService } from '../../core/utility/common-functions.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  // Dependency Injection with constructor
  constructor(private userService: UserService, private formBuilder: FormBuilder) {
    this._loginForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  // Inject
  router = inject(Router);
  commonFunctionsService = inject(CommonFunctionsService);

  // Init
  ngOnInit() {
    // Fetch user details and validate Token
  }

  // Form variables
  _loginForm: FormGroup;

  // Methods
  async onFormSubmit() {
    // validate details
    if (this._loginForm.invalid) {
      // Email Vaidation
      if (this._loginForm.controls['email'].value.trim() == '') {
        this.commonFunctionsService.showSnackBar('Email cannot be blank.');
        return
      }

      if (this._loginForm.controls['email'].invalid) {
        this.commonFunctionsService.showSnackBar('Invalid Email address.');
        return
      }

      // Password Vaidation
      if (this._loginForm.controls['password'].invalid) {
        this.commonFunctionsService.showSnackBar('Password cannot be blank.');
        return
      }
    }

    // Submit request
    let formValues = this._loginForm.value;
    let resData = await this.userService.LoginUser({
      Email: formValues.email,
      Password: formValues.password
    });

    if (resData.success) {
      localStorage.setItem(LocalStorageConst.TokenKey, resData.token ?? '');
      this.router.navigate(['dashboard']);
      return;
    }

    localStorage.removeItem(LocalStorageConst.TokenKey);
    console.error(resData.msg);
    if (resData.msg)
      this.commonFunctionsService.showSnackBar(resData.msg);
  }

  navigateToRegister() {
    this.router.navigate(['register']);
  }
}
