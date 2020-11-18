import {tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import {Observable} from 'rxjs';

import {LoaderService} from '../services/loader/loader.service';


@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  constructor(public loader: LoaderService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(tap((event: HttpEvent<any>) => {
      //console.log(event);
      if (event instanceof HttpResponse) {
        this.loader.pop(request.url);
      } else {
        this.loader.push(request.url);
      }
    }, (error: any) => {
      if (error instanceof HttpErrorResponse) {
        this.loader.pop(request.url);
      }
    }));
  }
}
