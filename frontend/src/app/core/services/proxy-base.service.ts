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
  async getRequest<T>(url: string, body?: object) {
    return await this.baseRequest<T>('GET', url, body);
  }

  // Post request
  async request<T>(method: string, url: string, body?: object) {
    return await this.baseRequest<T>(method, url, body);
  }

  // Request base method call
  private async baseRequest<T>(
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

    return new Promise((resolve, reject) => {
      return this.http.request<T>(method, apiUrl, config).subscribe({
        next: resolve,
        error: reject,
      });
    });
  }
}
