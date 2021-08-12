import { Injectable } from '@angular/core';
import {environment} from "@environments/environment";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  uri = `${environment.apiUrl}${'get-random-children'}`;

  constructor(private http: HttpClient) {
  }

  getRandomChildren() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.get(`${this.uri}`, httpOptions);
  }

}
