import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse,
    HttpErrorResponse
  } from '@angular/common/http';
  import { Observable, throwError } from 'rxjs';
  import { map, catchError } from 'rxjs/operators';
  import { Injectable } from '@angular/core';
  import { ApiService } from '../api.service';

  @Injectable({
    providedIn: 'root'
  })

  export class AuthConfigInterceptor implements HttpInterceptor {
    

    constructor(private api:ApiService) { }
  
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

      console.log("interception started");
  
      let token = this.api.getUserToken();

      console.log(token);
      token = token['id'];
      //Authentication by setting header with token value
      if (token) {
        request = request.clone({
          setHeaders: {
            'Authorization': token
          }
        });
      }
  
      if (!request.headers.has('Content-Type')) {
        request = request.clone({
          setHeaders: {
            'content-type': 'application/json'
          }
        });
      }
  
      request = request.clone({
        headers: request.headers.set('Accept', 'application/json')
      });

      return next.handle(request).pipe(
        map((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            console.log('event--->>>', event);
          }
          return event;
        }),
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          return throwError(error);
        }));
    }

  
  }