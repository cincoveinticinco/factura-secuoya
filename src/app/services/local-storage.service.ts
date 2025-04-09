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

  getVendor() {
    return JSON.parse(localStorage.getItem('vendor') || '');
  }

}
