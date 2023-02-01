import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DirectusService {
  constructor(private http: HttpClient) {}
  BASE_URL = 'https://vecr85wi.directus.app/';

  getCollaborateurs() {
    return this.http.get(this.BASE_URL + 'items/collaborateur?fields=*.*');
  }

  getIterations() {
    return this.http.get(this.BASE_URL + 'items/Iteration?fields=*');
  }

  getPlanStaff() {
    return this.http.get(this.BASE_URL + 'items/Plan_de_staffing?fields=*.*');
  }
}
