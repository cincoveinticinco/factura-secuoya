import { HttpInterceptorFn } from '@angular/common/http';

export const companyInterceptor: HttpInterceptorFn = (req, next) => {

  const params = req.params.set('company_id', '18');

  const companyReq = req.clone({
    params
  })

  return next(companyReq);
};
