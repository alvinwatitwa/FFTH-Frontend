import { Injectable } from '@angular/core';
import {environment} from "@environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  uri = `${environment.apiUrl}${'members'}`;
  token: any;
   httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`
    })
  };
  constructor(private http: HttpClient) {
    const getdata = JSON.parse(localStorage.getItem('currentUser'));
    this.token = getdata.data.token;
  }

  getMembers(householdId: number) {
    return this.http.get(`${this.uri}/` + householdId, this.httpOptions);
  }

}
