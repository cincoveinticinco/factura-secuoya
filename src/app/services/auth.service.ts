import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { DocumentTypes } from '../interfaces/document-types-response';
import { tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { LocalStorageService } from './local-storage.service';

@Injectable({
providedIn: 'root'
})
export class AuthService {

    private loginApiUrl: string = environment.apiUrlFront;
    private localStorage = inject(LocalStorageService);

    constructor(
        private http: HttpClient,
        private route: ActivatedRoute
    ) { }

    authenticateUser(form: {
        documentType: string,
        documentNumber: string,
        orderNumber: string,
        requestType: string
    }) {
        const params = {
            f_document_type_id: form.documentType,
            document_number: form.documentNumber,
            order_number: form.orderNumber,
          f_request_has_project_types_id: form.requestType,
            company_id: '18',
        }

        return this.http.get(`${environment.apiUrl}cmo/authenticate_oc_user`, {
            params
        })
        .pipe(
            tap((res: any) => {
                if(res.status === 200) {
                    this.localStorage.setToken(res.vendor_token);
                    this.localStorage.setVendorId(res.vendor_id);
                }
            })
        )
    }

    logOut() {
        this.route.params.subscribe((params: any) => {
            localStorage.clear();
            window.location.href = this.loginApiUrl;
        })
    }

}
