import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { tap, delay, map, first} from 'rxjs/operators';

import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChildrenService {

  uri = `${environment.apiUrl}${'children'}`;

  constructor(private http: HttpClient) {
  }

  getChildren(token) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: `Bearer ${token}`
      })
    };
    return this.http.get(`${this.uri}`, httpOptions);
  }

  addChild(token, formFields: any) {

    const params = new HttpParams();

    const httpOptions = {
      headers: new HttpHeaders({
        accept:  'application/json',
        Authorization: `Bearer ${token}`
      }),
      params,
      reportProgress: true,
    };

    return this.http.post<any>(`${this.uri}`, formFields , httpOptions)
          .pipe(
            map(data => {
              return data;
          }
        ));
  }

  editChild(token, childID, formFields: any) {

    const params = new HttpParams();

    const httpOptions = {
      headers: new HttpHeaders({
        accept:  'application/json',
        Authorization: `Bearer ${token}`
      }),
      params,
      reportProgress: true,
    };

    return this.http.put<any>(`${this.uri}/${childID}` , formFields , httpOptions)
          .pipe(
            map(data => {
              return data;
          }
        ));
  }

  deleteChild(token, childID) {

    const params = new HttpParams();

    const httpOptions = {
      headers: new HttpHeaders({
        Accept:  'application/json',
        Authorization: `Bearer ${token}`
      }),
      params,
      reportProgress: true,
    };

    return this.http.delete<any>(`${this.uri}/${childID}` , httpOptions)
          .pipe(
            map(data => {
              return data;
          }
        ));
  }

}
