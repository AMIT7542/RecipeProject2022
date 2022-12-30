import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../Auth/auth.service';
@Injectable({
  providedIn: 'root',
})
export class TokenInterceptor implements HttpInterceptor {
  constructor(private _authService: AuthService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this._authService.getToken();
    if (token) {
      const modifiedRequest = req.clone({
        params: new HttpParams().set('auth', token),
        // setHeaders: { auth: token },
      });
      return next.handle(modifiedRequest);
    } else {
      debugger;
      return next.handle(req);
    }
  }
}
