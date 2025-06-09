import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  
  const credentials = sessionStorage.getItem('auth'); // Stored as base64(username:password)

  if (credentials) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Basic ${credentials}`
      }
    });
    return next(authReq);
  }

  return next(req);
  
};
