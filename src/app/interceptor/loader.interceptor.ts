import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { LoaderService } from '../shared/loader/loader.service';
@Injectable({
  providedIn: 'root',
})
export class LoaderInterceptor implements HttpInterceptor {
  constructor(private _loaderService: LoaderService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this._loaderService.show();
    // return next.handle(req).pipe(finalize(()=>this._loaderService.hide()))
    return next.handle(req).pipe(finalize(() => this._loaderService.hide()));
  }
}
