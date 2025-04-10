import { Injectable } from '@angular/core';
import { VendorData } from '../interfaces/vendor-data.interface';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setVendorId(vendor_id: number) {
    localStorage.setItem('id_vendor_oc_id', `${vendor_id}`);
  }

  getVendorId() {
    return localStorage.getItem('id_vendor_oc_id');
  }

  setToken(token: string) {
    localStorage.setItem('id_vendor_oc_token', token);
  }

  getToken() {
    return localStorage.getItem('id_vendor_oc_token');
  }

  setVendor(vendor: VendorData) {
    localStorage.setItem('vendor', JSON.stringify(vendor));
  }

  getVendor(): VendorData {
    return JSON.parse(localStorage.getItem('vendor') || '');
  }

  setParams(params: any) {
    localStorage.setItem('params', JSON.stringify(params));
  }
  
  getParams(): any {
    return JSON.parse(localStorage.getItem('params') || '');
  }
  
  setFormValue(form: any) {
    localStorage.setItem('form', JSON.stringify(form));
  }
  
  getFormValue(): any {
    return JSON.parse(localStorage.getItem('form')!);
  }
  
  setRadicadoInfo(radicado_info: any) {
    localStorage.setItem('radicado_info', JSON.stringify(radicado_info));
  }

  getRadicadoInfo(): any {
    return JSON.parse(localStorage.getItem('radicado_info')!);
  }

}
