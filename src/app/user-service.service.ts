import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  constructor(private http: HttpClient) {}
  getData() {
    let url = 'https://pokeapi.co/api/v2/pokemon/1';
    return this.http.get(url);
  }
}
