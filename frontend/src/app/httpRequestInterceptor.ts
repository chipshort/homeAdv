import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import {catchError} from 'rxjs/operators';
import {AuthService} from './authentification/auth.service';
import {Injectable} from '@angular/core';
import {throwError} from 'rxjs';
import {Router} from '@angular/router';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {


  public constructor(private authService: AuthService, private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const newReq = req.clone({
      url: '/rest' + req.url,
      withCredentials: true
    });
    console.log('interceptor working');

    return next.handle(newReq).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse)  {
          if (error.status === 401) {
            this.authService.clearAndNavigateToLogin();
          } else if (error.status === 404) {
            this.router.navigate(['/404']);
          } else {
            // this.errorService.throwNetworkError(error.status);
          }
        }
        return throwError(error);
      })
    );
  }

}
