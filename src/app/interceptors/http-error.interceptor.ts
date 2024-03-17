import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private authservice:AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        this.handleError(error);
        return throwError(() => new Error(error.message));
      })
  )
  }

  public handleError(err: HttpErrorResponse) {
    let errorMessage: string;
 
    if(err.status==401){
      this.authservice.logout()
    }

    // if (err.error instanceof ErrorEvent) {
    //   // A client-side or network error occurred. Handle it accordingly.
    //   errorMessage = `An error occurred: ${err.error.message}`;
    // } else {
    //   // The backend returned an unsuccessful response code.
    //   switch (err.status) {
    //     case 400:
    //       errorMessage = "Bad Request.";
    //       break;
    //     case 401:
    //       this._authService.logout(true);
    //       console.log('inside 401');
          
    //       errorMessage = "You need to log in to do this action.";
    //       break;
    //     case 403:
    //       errorMessage = "You don't have permission to access the requested resource.";
    //       break;
    //     case 404:
    //       errorMessage = "The requested resource does not exist.";
    //       break;
    //     case 412:
    //       errorMessage = "Precondition Failed.";
    //       break;
    //     case 500:
    //       errorMessage = "Internal Server Error.";
    //       break;
    //     case 503:
    //       errorMessage = "The requested service is not available.";
    //       break;
    //     case 422:
    //       errorMessage = "Validation Error!";
    //       break;
    //     default:
    //       errorMessage = "Something went wrong!";
    //   }
    }
}
