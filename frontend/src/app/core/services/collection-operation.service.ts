import { inject, Injectable } from '@angular/core';
import { ApiEndpoints } from '../constants/ApiUrls';
import { ProxyBaseService } from './proxy-base.service';
import { CollectionResponse } from '../models/nestItem.model';

@Injectable({
  providedIn: 'root'
})
export class CollectionOperationService {

  // Inject
  proxyBase = inject(ProxyBaseService);

  // API Calls
  async getCollectionAndItems(collectionId: Number | undefined) {
    let api = ApiEndpoints.Collection.Get + (collectionId ? '/' + collectionId : '');
    let resData = await this.proxyBase.request<CollectionResponse>('get', api)

    return resData as CollectionResponse;
  }
}
