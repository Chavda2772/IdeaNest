import { inject, Injectable, signal } from '@angular/core';
import { ProxyBaseService } from './proxy-base.service';
import { ApiEndpoints } from '../constants/ApiUrls';
import { UserDetails } from '../models/userDetails.model';
import { CommonFunctionsService } from '../utility/common-functions.service';
import { LocalStorageConst } from '../constants/LocalStorageConst';
import { Router } from '@angular/router';
import { Responsedata } from '../models/responsedata.model';
import { LoginPayload } from '../models/common.model';

@Injectable({
  providedIn: 'any',
})
export class UserService {
  constructor(private router: Router) {
    if (this.GetUserToken())
      this.isUserLogedIn.set(true)
  }

  // Injecting
  private _proxyBase = inject(ProxyBaseService);
  private _commonFunction = inject(CommonFunctionsService);

  // State Variables
  userDetails: UserDetails | undefined = undefined;
  isUserLogedIn = signal<Boolean>(false);

  // Login User
  async LoginUser(loginPayload: LoginPayload) {
    let data = await this._proxyBase.request<Responsedata>('post', ApiEndpoints.Auth.Login, loginPayload) as Responsedata;

    this.userDetails = data.result as UserDetails;
    this.isUserLogedIn.set(data?.result ? true : false);
    return data;
  }

  // Register User
  async RegisterUser(userDetails: UserDetails) {
    try {
      return await this._proxyBase.request('POST', ApiEndpoints.Auth.Register, userDetails);
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
    this.isUserLogedIn.set(false);
    this.userDetails = undefined;
    this.router.navigate(['login']);
  }

  // get Token
  GetUserToken() {
    return localStorage.getItem(LocalStorageConst.TokenKey);
  }
}
