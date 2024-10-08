import { inject, Injectable } from '@angular/core';
import { ApiEndpoints } from '../constants/ApiUrls';
import { ProxyBaseService } from './proxy-base.service';
import { CollectionResponse } from '../models/nestItem.model';
import { Responsedata } from '../models/responsedata.model';

@Injectable({
  providedIn: 'root'
})
export class CollectionOperationService {

  // Inject
  proxyBase = inject(ProxyBaseService);

  // Get collection
  async getCollectionAndItems(collectionId: number | undefined) {
    let api = ApiEndpoints.Collection.Get + (collectionId ? '/' + collectionId : '');
    let resData = await this.proxyBase.request<CollectionResponse>('get', api)

    return resData as CollectionResponse;
  }

  // Adding collection
  async addCollection(CollectionName: String, CollectionParentId: number | null) {
    let resData = await this.proxyBase.request<Responsedata>('post', ApiEndpoints.Collection.Add, {
      CollectionName: CollectionName,
      CollectionParentId: CollectionParentId
    })

    return resData as Responsedata;
  }

  // Update collection
  async updateCollection(id: number, name: string) {
    let resData = await this.proxyBase.request<Responsedata>('put', ApiEndpoints.Collection.Add, {
      CollectionId: id,
      CollectionName: name
    })

    return resData as Responsedata;
  }

  // Delete collection
  async deleteCollection(id: number) {
    let resData = await this.proxyBase.request<Responsedata>('delete', `${ApiEndpoints.Collection.Add}/${id}`)
    return resData as Responsedata;
  }
}
