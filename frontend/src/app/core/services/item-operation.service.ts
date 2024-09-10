import { inject, Injectable } from '@angular/core';
import { ProxyBaseService } from './proxy-base.service';
import { ApiEndpoints } from '../constants/ApiUrls';
import { Responsedata } from '../models/responsedata.model';

@Injectable({
  providedIn: 'root'
})
export class ItemOperationService {

  // Inject classes
  proxyBaseService = inject(ProxyBaseService);

  async addNestItem(body?: object) {
    let responseData = await this.proxyBaseService.request<Responsedata>('post', ApiEndpoints.NestItems.Add, body);
    return responseData as Responsedata;
  }
}
