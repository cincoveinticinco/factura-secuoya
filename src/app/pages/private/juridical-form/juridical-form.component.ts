import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormBase } from '../../../bases/form-base';
import { FileboxComponent, LogoComponent, OrdersTableComponent, SelectInputComponent, SubtitleComponent, TextInputComponent } from '../../../components';
import { Order, VendorData } from '../../../interfaces/vendor-data.interface';
import { DOCUMENT_IDS } from '../../../enums/DOCUMENT_IDS';

@Component({
  selector: 'app-juridical-form',
  imports: [
    LogoComponent,
    SubtitleComponent,
    TextInputComponent,
    FileboxComponent,
    OrdersTableComponent,
    SelectInputComponent,
    ReactiveFormsModule
  ],
  templateUrl: './juridical-form.component.html',
  styleUrl: './juridical-form.component.scss'
})
export class JuridicalFormComponent extends FormBase {

  loading = false;
  vendor!: VendorData;
  selectedOrders!: Order[];

  constructor() {
    const form = new FormGroup({
      purchaseOrder: new FormControl({value:'', disabled: true}, Validators.required),
      personType: new FormControl({value:'', disabled: true}, Validators.required),
      documentType: new FormControl({value:'', disabled: true}, Validators.required),
      documentNumber: new FormControl({value:'', disabled: true}, Validators.required),
      companyName: new FormControl({value:'', disabled: true}, Validators.required),
      address: new FormControl({value:'', disabled: true}, Validators.required),
      email: new FormControl({value:'', disabled: true}, Validators.required),
      electronic_invoice: new FormControl({value:'', disabled: true}, Validators.required),
    });

    super(form);
  }

  ngOnInit() {
    this.setForm();
  }

  setForm() {
    this.vendor = this.localStorage.getVendor();
    this.getControl('personType').patchValue(this.vendor.vendor.personType);
    this.getControl('documentType').patchValue(this.vendor.vendor.documentTypeEsp);
    this.getControl('documentNumber').patchValue(this.vendor.vendor.documentNumber);
    this.getControl('companyName').patchValue(this.vendor.vendor.companyName);
    this.getControl('address').patchValue(this.vendor.vendor.address);
    this.getControl('email').patchValue(this.vendor.vendor.email);
    this.getControl('purchaseOrder').patchValue(this.vendor.selectedOrders[0].consecutiveCodes);
    this.setSelectedOrders();
    this.setDocuments();
  }
  
  setSelectedOrders() {
    this.selectedOrders = this.vendor.selectedOrders;
    this.selectedOrders = this.selectedOrders.map(order => ({...order, optionName: order.consecutiveCodes, optionValue: order.consecutiveCodes}))
  }

  async onSubmit() {
    this.validateFiles(['electronic_invoice']);
    if (this.hasError) {
      return;
    }
    this.loading = true;
    this.errorUploadingDocuments = [];
    await this.uploadFiles(['electronic_invoice']);
    const params = this.setDocumentIds();
    this.localStorage.setFormValue(this.parentForm.value);
    this.localStorage.setParams(params);
    this.router.navigate(['po-orders']);
    this.loading = false;
  }

  setDocumentIds() {
    const params: any = { vendor_documents: [] };
    if (this.getControl('electronic_invoice')) {
      params.vendor_documents.push({
        document_type_id: DOCUMENT_IDS.ELECTRONIC_INVOICE,
        document: this.getControl('electronic_invoice')?.value?.document_url,
        document_id: this.getControl('electronic_invoice')?.value?.document_id
      });
    }
    return params;
  }

  setDocuments() {
    const form = this.localStorage.getFormValue() || '';
    const vendor = this.localStorage.getVendor() || '';

    if (vendor.vendor.vendorDocuments.length > 0) {
      const electronic_invoice = vendor.vendor.vendorDocuments.find(document => document.f_vendor_document_type_id === DOCUMENT_IDS.ELECTRONIC_INVOICE);
      this.getControl('electronic_invoice').setValue(electronic_invoice.link ? {name: electronic_invoice.link, url: electronic_invoice.link} : null);
      return;
    } 
    if (form.electronic_invoice) {
      this.getControl('electronic_invoice').setValue(form.electronic_invoice);
    }
    if (form.invoice) {
      this.getControl('invoice').setValue(form.invoice);
    }
  }

}
