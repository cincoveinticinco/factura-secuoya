import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LocalStorageService } from '../services';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const localStorage = inject(LocalStorageService)

  const token = localStorage.getToken();
  let authReq = req.clone({
    headers: req.headers.append('Authorization', `Bearer ${token}`).append('Content-Type', 'application/json'),
  });
  if (req.method === 'PUT') {
    authReq = req;
  }
  return next(authReq);

};
