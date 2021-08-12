import { Injectable } from '@angular/core';
import {environment} from "@environments/environment";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";

import {map} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class HouseholdService {
  uri = `${environment.apiUrl}${'households'}`;

  constructor(private http: HttpClient) {
  }

  getHouseholds(token) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
    return this.http.get(`${this.uri}`, httpOptions);
  }

  addHousehold(token, formFields: any) {

    const params = new HttpParams();

    const httpOptions = {
      headers: new HttpHeaders({
        'accept': 'application/json',
        'Authorization': `Bearer ${token}`
      }),
      params,
      reportProgress: true,
    };

    return this.http.post<any>(`${this.uri}`, formFields, httpOptions)
      .pipe(
        map(data => {
            return data;
          }
        ));
  }

  editHousehold(token, householdId, formFields: any) {

    const params = new HttpParams();

    const httpOptions = {
      headers: new HttpHeaders({
        'accept': 'application/json',
        'Authorization': `Bearer ${token}`
      }),
      params,
      reportProgress: true,
    };

    return this.http.put<any>(`${this.uri}/${householdId}`, formFields, httpOptions)
      .pipe(
        map(data => {
            return data;
          }
        ));
  }

  deleteHousehold(token, householdId) {

    const params = new HttpParams();

    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      }),
      params,
      reportProgress: true,
    };

    return this.http.delete<any>(`${this.uri}/${householdId}`, httpOptions)
      .pipe(
        map(data => {
            return data;
          }
        ));
  }
}
