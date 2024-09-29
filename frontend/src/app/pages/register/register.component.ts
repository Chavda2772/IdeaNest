import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../core/services/user.service';
import { UserDetails } from '../../core/models/userDetails.model';
import { CommonFunctionsService } from '../../core/utility/common-functions.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  _registerForm: FormGroup;
  validated: boolean = false;

  constructor(private formBuilder: FormBuilder) {
    // Registeration form
    this._registerForm = this.formBuilder.group({
      firstName: new FormControl('', [Validators.required]),
      middleName: new FormControl(''),
      lastName: new FormControl('', [Validators.required]),
      userName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required
      ]),
      confirmPassword: new FormControl('', [Validators.required]),
      contactNo: new FormControl(''), // Remove contact no
      theme: new FormControl('default-theme'),
      profileUrl: new FormControl(''),
    });
  }

  // Injectables
  router = inject(Router);
  userService = inject(UserService);
  commonFunctionsService = inject(CommonFunctionsService);

  // Methods
  async onSubmit() {
    // Details validation
    if (this._registerForm.invalid) {
      this.validated = true;
      this.commonFunctionsService.showSnackBar('Invalid details');
      return;
    }

    // Pasword match validation
    let listOfControls = this._registerForm.controls;
    if (listOfControls['password'].value != listOfControls['confirmPassword'].value) {
      this.commonFunctionsService.showSnackBar('Confirm password does not match the password. try again.');
      return;
    }

    // Prepare details
    let formValues = this._registerForm.value;
    let UserDetails: UserDetails = {
      FirstName: formValues.firstName,
      MiddleName: formValues.middleName,
      LastName: formValues.lastName,
      UserName: formValues.userName,
      Email: formValues.email,
      Password: formValues.password,
      ContactNo: formValues.contactNo,
      Theme: formValues.theme,
      ProfileUrl: formValues.profileUrl
    };

    // Proxy to save user details
    let resData: any = await this.userService.RegisterUser(UserDetails);
    if (resData.success) {
      this.router.navigate(['login']);
      this.commonFunctionsService.showSnackBar('User Registered successfully. Try to login.')
    }
    else
      console.error(resData.msg);
  }

  onNavigateToLogin() {
    this.router.navigate(['login']);
  }
}
