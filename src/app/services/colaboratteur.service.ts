import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ColaboratteurService {
  constructor(private http: HttpClient) {}

  getData() {
    return this.http.get(
      'https://vecr85wi.directus.app/items/collaborateur?fields=*.*'
    );
  }
}
