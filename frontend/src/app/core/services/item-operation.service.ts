import { inject, Injectable } from '@angular/core';
import { ProxyBaseService } from './proxy-base.service';
import { ApiEndpoints } from '../constants/ApiUrls';
import { Responsedata } from '../models/responsedata.model';
import { ItemResponseData } from '../models/nestItem.model';

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

  async deleteItem(id: Number) {
    let responseData = await this.proxyBaseService.request<Responsedata>('delete', `${ApiEndpoints.NestItems.Add}/${id}`);
    return responseData as Responsedata;
  }

  async getDetails(id: Number) {
    let responseData = await this.proxyBaseService.request<ItemResponseData>('get', `${ApiEndpoints.NestItems.Add}/${id}`);
    return responseData as ItemResponseData;
  }
}
