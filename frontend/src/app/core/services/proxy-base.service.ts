import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiEndpoints } from '../constants/ApiUrls';

@Injectable({
  providedIn: 'root',
})
export class ProxyBaseService {
  // Injecting
  http = inject(HttpClient);

  // Get Request
  async getRequest(url: string, body?: object) {
    return await this.baseRequest('GET', url, body);
  }

  // Post request
  async request(method: string, url: string, body?: object) {
    return await this.baseRequest(method, url, body);
  }

  // Request base method call
  private async baseRequest(
    method: string,
    url: string,
    body?: any,
    responseType?: any
  ) {
    // Preparing Request config
    var apiUrl = url;
    var config: any = {
      params: undefined,
      responseType: responseType || 'json',
      observe: 'body',
      body: undefined,
      headers: {
        contentType: 'application/json; charset=utf-8',
      },
    };

    // Modify url
    if (!url.startsWith('http')) {
      if (!url.endsWith('/') && !apiUrl.startsWith('/')) apiUrl = apiUrl + '/';

      apiUrl = ApiEndpoints.BaseApi + apiUrl;
    }

    // Adding parameters
    if (method.toLowerCase() == 'get')
      config.params = new HttpParams().appendAll(body);
    else config.body = body;

    let result = this.http.request(method, apiUrl, config);
    return new Promise((resolve, reject) => {
      result.subscribe({
        next: resolve,
        error: reject,
      });
    });
  }
}
