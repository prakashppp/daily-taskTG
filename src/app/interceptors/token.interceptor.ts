import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authservice:AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    //let localToken=localStorage.getItem('token')
    let tokenizedReq = request.clone({
      headers: request.headers.set(
        'Authorization',
        'Bearer ' + this.authservice.getToken()
      ),
    });
    return next.handle(tokenizedReq);
    
  }
}
