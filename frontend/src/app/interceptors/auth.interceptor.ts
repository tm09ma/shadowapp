import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment';

// Haengt bei jeder Anfrage den Auth-Token an, den das Backend
// (AuthFilter) fuer alle /api/**-Requests verlangt.
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authReq = req.clone({
    setHeaders: { 'X-Auth-Token': environment.authToken }
  });
  return next(authReq);
};
