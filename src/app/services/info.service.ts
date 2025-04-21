import { HttpClient, HttpParams } from '@angular/common/http';
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
    return this.http.get<DocumentTypes[]>(`${environment.apiUrl}cmo/get_document_types?company_id=18`);
  }

  getFormInitialData() {
    return this.http.get<VendorData>(`${environment.apiUrl}cmo/get_form_initial_data?company_id=18`, {});
  }

  updateRegisterVendor(formParams: any) {
    let params = formParams;
    params.company_id = '18';

    return this.http.post(`${environment.apiUrl}cmo/update_register`, params, { });
  }

  // This function will retrieve three keys, purchaseOrders that haves an array of purchaseOrders ids, vendorEmail and the status of the request
  getPurchaseOrders(vendorDocument: number, requestType: string) {
    // send in params vendor_document
    return this.http.get(`${environment.apiUrl}cmo/get_purchase_orders`, {
      params: {
        vendor_document: vendorDocument.toString(),
        f_request_has_project_types_id: requestType,
        company_id: '18',
      }
    });
  }

  sendPurchaseOrdersToEmail(formValues: {
    email: string,
    purchaseOrdersIds: string,
    document: number
  }) {
    return this.http.get(`${environment.apiUrl}cmo/send_purchase_orders_email`, {
      params: {
        email: formValues.email,
        purchase_orders_ids: formValues.purchaseOrdersIds,
        document: formValues.document.toString(),
        company_id: '18',
      }
    });
  }

}
