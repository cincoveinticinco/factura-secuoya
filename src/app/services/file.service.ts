import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map, Observable, tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Injectable({
providedIn: 'root'
})
export class FileService {

    constructor(
        private http: HttpClient,
        private route: ActivatedRoute
    ) { }

    getPresignedPutURLOc(filename: string, vendor_id: string, folder?: string ): Observable<any> {
        let params = {
            'filename': filename,
            'vendor_id': vendor_id,
            'folder': folder
        };
        return this.http.post(`${environment.apiUrl}finance/getPresignedUrlService`, params);
    }

    uploadFileUrlPresigned(file: any, uploadUrl: string, contentType:string): Observable<any> {
		const headers = new HttpHeaders({'Content-Type': contentType, 'Accept': '*/*'});
		const req = new HttpRequest(
			'PUT', uploadUrl, file, {
			headers: headers
		});
		return this.http.request(req);
	}

    signUrl(document: any) {
        let params = {
          'document': document,
          company_id: 18,
        }

        return this.http.get(`${environment.apiUrl}cmo/sign_document`, { params });
    }

    updateVendorDocument(formData: any){
        return this.http.post(`${environment.apiUrl}cmo/add_document_vendor`, {...formData})
        .pipe(map( response => response))
      }



}
