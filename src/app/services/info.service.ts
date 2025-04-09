import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { DocumentTypes } from '../interfaces/document-types-response';
import { VendorData } from '../interfaces/vendor-data.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoService {

  constructor(
    private http: HttpClient
  ) { }


  getDocumentTypes() {
    return this.http.get<DocumentTypes[]>(`${environment.apiUrl}cmo/get_document_types`);
  }

  getFormInitialData() {
    return this.http.get<VendorData>(`${environment.apiUrl}cmo/get_form_initial_data`, {});
  }

}
