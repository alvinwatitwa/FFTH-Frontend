import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from "@environments/environment";

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  uri = `${environment.apiUrl}${'stats'}`;

  constructor(private http: HttpClient) {
  }

  getStats(token) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
    return this.http.get(`${this.uri}`, httpOptions);
  }

}
