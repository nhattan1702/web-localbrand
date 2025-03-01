import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {AppAlert, AppLoading} from '../../../shared/utils';
import {AUTH_CONSTANT} from '../../constant/auth.constant';
import {Router} from '@angular/router';

@Injectable()
export class CustomHandleInterceptor implements HttpInterceptor {
  constructor(
    private alert: AppAlert,
    private loading: AppLoading,
    private router: Router
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authorization = localStorage.getItem(AUTH_CONSTANT.AUTH_KEY);
    let customReq = req;
    if (authorization) {
      customReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + authorization)
      });
    }

    return next.handle(customReq).pipe(
      tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse && event.url != null && event.url.match('/auth/login')) {
            if (event.body.result.token) {
              localStorage.setItem(AUTH_CONSTANT.AUTH_KEY, event.body.result.token);
            }
          }
        },
        (error: any) => {
          if (error instanceof HttpErrorResponse) {
            if (error.error && error.error.result) {
              error.error.result.forEach((msg: any) => {
                this.alert.error(msg);
              });
            } else {
              this.alert.error(error.error.message);
            }
            this.loading.hideAll();
            if (error.status === 401) {
              localStorage.removeItem(AUTH_CONSTANT.AUTH_KEY);
              this.router.navigateByUrl('/login');
            }
          }
        }
      )
    );
  }
}
