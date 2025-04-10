import { HttpInterceptorFn } from '@angular/common/http';

export const companyInterceptor: HttpInterceptorFn = (req, next) => {

  if (req.method !== 'PUT' && ['getPresignedUrlService'].includes(req.url)) {
    const params = req.params.set('company_id', '18');
  
    const companyReq = req.clone({
      params
    })
  
    return next(companyReq);
  }

  return next(req);

};
