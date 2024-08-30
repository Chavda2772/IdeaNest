import { inject, Injectable } from '@angular/core';
import { ProxyBaseService } from './proxy-base.service';
import { ApiEndpoints } from '../constants/ApiUrls';
import { UserDetails } from '../models/userDetails.model';
import { CommonFunctionsService } from '../utility/common-functions.service';
import { LocalStorageConst } from '../constants/LocalStorageConst';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'any',
})
export class UserService {
  constructor(private router: Router) { }

  // Injecting
  private _proxyBase = inject(ProxyBaseService);
  private _commonFunction = inject(CommonFunctionsService);

  // State Variables
  userDetails: UserDetails | undefined;

  // Login User
  async LoginUser(Email: string, Password: string) {
    try {
      let resData = await this._proxyBase.request(
        'POST',
        ApiEndpoints.Auth.Login,
        {
          email: Email,
          password: Password,
        }
      );

      return resData;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // Register User
  async RegisterUser(userDetails: UserDetails) {
    try {
      return await this._proxyBase.request('POST', ApiEndpoints.Auth.Register, {
        ...userDetails,
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // Get Details
  async GetUserDetails(token: string) {
    try {
      let body = { token };

      // Fetch User Details
      let resData = await this._proxyBase.request(
        'POST',
        ApiEndpoints.Auth.GetDetails,
        body
      );

      return resData;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // Remove token from local storage
  async Logout() {
    localStorage.removeItem(LocalStorageConst.TokenKey);
    this.router.navigate(['login']);
  }
}
