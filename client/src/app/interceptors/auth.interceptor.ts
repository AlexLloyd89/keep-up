import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, from, switchMap, catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
  private authService = inject(AuthService);

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // 👇 Skip if the request is for login or any excluded route
    const excludedPaths = ['/login', '/auth/google', '/signup'];
    const isExcluded = excludedPaths.some((path) => req.url.includes(path));

    if (isExcluded) {
      return next.handle(req);
    }

    return from(this.authService.getCurrentUserToken()).pipe(
      switchMap((token) => {
        const cloned = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        });
        return next.handle(cloned);
      })
    );
  }
}
