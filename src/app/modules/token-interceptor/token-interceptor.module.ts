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

@Injectable({
  providedIn: 'root'
})



export class TokenInterceptor implements HttpInterceptor {
  whitelistedUrls = [
    '/login',
    '/logout'
  ]

  constructor(private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: string = localStorage.getItem('access_token') || '';
    if (this.whitelistedUrls.includes(req.url.replace(Config.Host, ''))) {
      return next.handle(req);
    }

    if (token != '') {
      const reqWithToken = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next.handle(reqWithToken).pipe(
        retry(2),
        catchError((error: HttpErrorResponse) => {
          return throwError(error)
        }),
        finalize(() => {

        }),
        tap((event: any) => {
          if (event instanceof HttpResponse) {
            if (event.body?.status === 403) {
              this.router.navigate(['login']);
            }
          }
        })
      );

    } else {
      this.router.navigate(['login']);
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
