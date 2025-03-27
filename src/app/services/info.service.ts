import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { DocumentTypes } from '../interfaces/document-types-response';

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

}
