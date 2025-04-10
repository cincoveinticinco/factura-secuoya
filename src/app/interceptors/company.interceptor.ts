import { HttpInterceptorFn } from '@angular/common/http';

export const companyInterceptor: HttpInterceptorFn = (req, next) => {

  console.log(['getPresignedUrlService'].includes(req.url))
  console.log(req)

  if (req.method !== 'PUT' && req.url !== 'http://localhost:3000/finance/getPresignedUrlService' ) {
    const params = req.params.set('company_id', '18');
  
    const companyReq = req.clone({
      params
    })
  
    return next(companyReq);
  }

  return next(req);

};
