import { Component } from '@angular/core';
import { LogoComponent, TextInputComponent, OrdersTableComponent, FileboxComponent, SubtitleComponent, SelectInputComponent } from '../../../components';
import { FormBase } from '../../../bases/form-base';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Order, VendorData } from '../../../interfaces/vendor-data.interface';
import { DOCUMENT_IDS } from '../../../enums/DOCUMENT_IDS';

@Component({
  selector: 'app-natural-form',
  imports: [
    LogoComponent,
    SubtitleComponent,
    TextInputComponent,
    FileboxComponent,
    OrdersTableComponent,
    SelectInputComponent,
    ReactiveFormsModule
  ],
  templateUrl: './natural-form.component.html',
  styleUrl: './natural-form.component.scss'
})
export class NaturalFormComponent extends FormBase {

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
      template: new FormControl({value:'', disabled: true}, Validators.required),
      invoice: new FormControl({value:'', disabled: true}, Validators.required),
    });

    super(form);
  }

  async ngOnInit() {
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
    this.validateFiles(['template', 'invoice']);
    if (this.hasError) {
      return;
    }

    this.loading = true;

    this.errorUploadingDocuments = [];
    await this.uploadFiles(['template', 'invoice']);
    const params = this.setDocumentIds();
    this.localStorage.setFormValue(this.parentForm.value);
    this.localStorage.setParams(params);
    this.router.navigate(['po-orders']);
    this.loading = false;
  }

  setDocumentIds() {
    const params: any = { vendor_documents: [] };
    if (this.getControl('template')) {
      params.vendor_documents.push({
        document_type_id: DOCUMENT_IDS.TEMPLATE,
        document: this.getControl('template')?.value.document_url,
        document_id: this.getControl('template')?.value.document_id
      });
    }
    if (this.getControl('invoice')) {
      params.vendor_documents.push({
        document_type_id: DOCUMENT_IDS.INVOICE,
        document: this.getControl('invoice')?.value.document_url,
        document_id: this.getControl('invoice')?.value.document_id
      });
    }
    return params;
  }

  setDocuments() {
    const form = this.localStorage.getFormValue() || '';
    const vendor = this.localStorage.getVendor() || '';

    if (vendor.vendor.vendorDocuments.length > 0) {
      const invoice = vendor.vendor.vendorDocuments.find(document => document.f_vendor_document_type_id === DOCUMENT_IDS.INVOICE);
      const template = vendor.vendor.vendorDocuments.find(document => document.f_vendor_document_type_id === DOCUMENT_IDS.TEMPLATE);
      this.getControl('invoice').setValue(invoice.link ? {name: invoice.link, url: invoice.link} : null);
      this.getControl('template').setValue(template.link ? {name: template.link, url: template.link} : null);
      return;
    } 
    
    if (form.template) {
      this.getControl('template').setValue(form.template);
    }
    if (form.invoice) {
      this.getControl('invoice').setValue(form.invoice);
    }
  }


}
