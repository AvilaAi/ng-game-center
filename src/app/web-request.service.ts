import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WebRequestService {
  readonly ROOT_URL;

  constructor(private http: HttpClient) {
    this.ROOT_URL = 'http://localhost:8090/api';
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
