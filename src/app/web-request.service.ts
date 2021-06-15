import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WebRequestService {
  readonly ROOT_URL;

  constructor(private http: HttpClient) {
    this.ROOT_URL = environment.urlApi;
  }

  get(uri: string) {
    let url = this.ROOT_URL + uri;
    return this.http.get(url);
  }

  post(uri: string, payload: Object) {
    let url = this.ROOT_URL + uri;
    console.log('payload', payload);
    return this.http.post(url, payload);
  }

  patch(uri: string, payload: Object) {
    let url = this.ROOT_URL + uri;
    return this.http.post(url, payload);
  }
}
