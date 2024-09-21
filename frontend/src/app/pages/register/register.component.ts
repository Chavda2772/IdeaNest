import { Component, Injectable } from '@angular/core';
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

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  _registerForm: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
    // Registeration form
    this._registerForm = this.formBuilder.group({
      firstName: new FormControl('', [Validators.required]),
      middleName: new FormControl(''),
      lastName: new FormControl('', [Validators.required]),
      userName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      confirmPassword: new FormControl('', [Validators.required]),
      contactNo: new FormControl('', [
        Validators.required,
        Validators.maxLength(12),
      ]),
      theme: new FormControl('default-theme'),
      profileUrl: new FormControl(''),
    });
  }

  // Methods
  async onSubmit() {
    // Detail
    if (this._registerForm.invalid) {
      // Fetch every control and find invalid controls
      // TODO : PENDING
      let invalidControls = this._registerForm.controls;
      console.warn('Invalid Details');
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

    // Proxy to save data
    let resData: any = await this.userService.RegisterUser(UserDetails);
    if (resData.success) {
      this.router.navigate(['login']);
    }
    else {
      console.error(resData.msg);
    }
  }

  onNavigateToLogin() {
    this.router.navigate(['login']);
  }
}
