import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

// Interceptor : σεταρει στους headers authorization, bearer kai to authoToken
@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler)  {
    const authToken = localStorage.getItem("access_token"); 
    if (!authToken) {
      return next.handle(req)
    }

    const authRequest = req.clone({
      headers: req.headers.set("Authorization", "Bearer " + authToken)
    });
    return next.handle(authRequest)
  }
};
