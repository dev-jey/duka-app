import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import {
    Router
  } from "@angular/router";
  import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../../_services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {
  token: string;
  constructor(private auth: AuthService, private router: Router ) {
  }
  handleError(err: HttpErrorResponse) {
    if (err instanceof HttpErrorResponse) {
        if (err.status === 404) {
            this.router.navigateByUrl('/error/404');
        }
        if(err.status === 500){
            this.router.navigateByUrl('/error/500');
        }
    }
    return throwError(err);
  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentUser: any = localStorage.getItem('mediclaimUserToken');
    if (currentUser) {
      this.token = currentUser;
      request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + this.token) });
    }
    return next.handle(request).pipe(
      catchError(this.handleError.bind(this))
    );
  }
}