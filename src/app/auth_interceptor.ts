import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from './auth/auth.service';

@Injectable()
export class APIInterceptor implements HttpInterceptor {
    token;
    constructor(private authenticationService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

      const getdata = JSON.parse(localStorage.getItem('currentUser'));

      this.token = getdata.data.token;

      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.token}`
        }
      });

      return next.handle(request);
    }
}
