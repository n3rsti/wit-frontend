import {Injectable, ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HttpResponse, HTTP_INTERCEPTORS
} from '@angular/common/http';
import {Router} from "@angular/router";
import {catchError, finalize, Observable, retry, tap, throwError} from "rxjs";
import {Config} from "../../config";
import {DataService} from "../../services/data.service";

const JWT_REFRESH_ENDPOINT = '/api/v1/token/refresh';

@Injectable({
  providedIn: 'root'
})


export class TokenInterceptor implements HttpInterceptor {

  returnUrl = '';
  whitelistedUrls = [
    '/api/v1/login',
    '/logout',
    JWT_REFRESH_ENDPOINT
  ]

  constructor(private router: Router, private data: DataService) {
    if (!this.router.routerState.snapshot.root.queryParams?.['return'] || this.router.routerState.snapshot.root.queryParams?.['return'] === '')
      this.returnUrl = this.router.routerState.snapshot.url;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: string = localStorage.getItem('access_token') || '';
    const refresh_token: string = localStorage.getItem('refresh_token') || '';
    if (this.whitelistedUrls.includes(req.url.replace(Config.Host, ''))) {
      if(req.url.replace(Config.Host, '') === JWT_REFRESH_ENDPOINT){
        const reqWithToken = req.clone({
          setHeaders: {
            Authorization: `Bearer ${refresh_token}`
          }
        });

        return next.handle(reqWithToken);
      }

      return next.handle(req);
    }

    if (token != '') {
      const reqWithToken = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next.handle(reqWithToken).pipe(
        retry(1),
        catchError((error: HttpErrorResponse) => {
          // Check for UNAUTHORIZED response status
          if(error.status === 401){
            // Attempt to refresh token
            return this.data.refreshToken().pipe(
              retry(1),
              catchError((error: HttpErrorResponse) => {
                if (error.status === 403) {
                  this.router.navigate(['/login'], {
                    queryParams: {
                      return: this.returnUrl
                    }
                  });
                }
                return throwError(error)
              }),
              tap((event: any) => {
                if (event instanceof HttpResponse) {
                  if (event.status === 200){
                    localStorage.setItem("access_token", event.body?.access_token);
                  }
                }
              })
            );

          }
          return throwError(error)
        }),
      );

    } else {
      this.router.navigate(['/login'], {
        queryParams: {
          return: this.returnUrl
        }
      });
    }

    return next.handle(req);
  }

}
@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    TokenInterceptor,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ]
})
export class TokenInterceptorModule {
  static forRoot(): ModuleWithProviders<TokenInterceptorModule>{
    return {
      ngModule: TokenInterceptorModule,
      providers: [
        { provide: HTTP_INTERCEPTORS,
          useClass: TokenInterceptor,
          multi: true
        }
      ]
    }
  }
}
