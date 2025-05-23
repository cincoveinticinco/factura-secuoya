import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
  get other_anexos() {
    return this.getControl('other_anexos') as FormArray;
  }

  constructor() {
    const form = new FormGroup({
      purchaseOrder: new FormControl({ value: '', disabled: true }, Validators.required),
      personType: new FormControl({ value: '', disabled: true }, Validators.required),
      documentType: new FormControl({ value: '', disabled: true }, Validators.required),
      documentNumber: new FormControl({ value: '', disabled: true }, Validators.required),
      companyName: new FormControl({ value: '', disabled: true }, Validators.required),
      address: new FormControl({ value: '', disabled: true }, Validators.required),
      email: new FormControl({ value: '', disabled: true }, Validators.required),
      electronic_invoice: new FormControl({ value: '', disabled: true }, Validators.required),
      other_anexos: new FormArray([]),
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
    this.selectedOrders = this.selectedOrders.map(order => ({ ...order, optionName: order.consecutiveCodes, optionValue: order.consecutiveCodes }))
  }

  async onSubmit() {
    this.validateFiles(['electronic_invoice', 'other_anexos']);
    if (this.hasError) return;

    this.loading = true;
    this.errorUploadingDocuments = [];

    try {
      await this.uploadFiles(['electronic_invoice']);

      if (this.other_anexos.value.length > 0) {
        await this.uploadFilesFromArrayOfControls(this.other_anexos);
      }

      const params = this.setDocumentIds();
      this.localStorage.setFormValue(this.parentForm.value);
      this.localStorage.setParams(params);
      this.router.navigate(['po-orders']);
    } catch (error) {
      console.error('Error durante envío:', error);
      this.globalService.openSnackBar('Error al enviar el formulario', '', 5000);
    } finally {
      this.loading = false;
    }
  }

  setDocumentIds() {
    const params: any = { vendor_documents: [] };
    if (this.getControl('electronic_invoice')) {
      params.vendor_documents.push({
        document_type_id: DOCUMENT_IDS.ELECTRONIC_INVOICE,
        document: this.getControl('electronic_invoice')?.value?.document_url || this.getControl('electronic_invoice')?.value.url,
        document_id: this.getControl('electronic_invoice')?.value?.document_id
      });
    }
    if (this.other_anexos.value.length > 0) {
      for (const anexo of this.other_anexos.value) {
        params.vendor_documents.push({
          document_type_id: DOCUMENT_IDS.ANEX,
          document: anexo.document_url || anexo.url,
          document_id: anexo.document_id
        });
      }
    }
    return params;
  }

  setDocuments() {
    const form = this.localStorage.getFormValue() || '';
    const vendor = this.localStorage.getVendor() || '';

    const electronic_invoice = vendor.vendor.vendorDocuments?.find(document => document.f_vendor_document_type_id === DOCUMENT_IDS.ELECTRONIC_INVOICE);
    const anexos = vendor?.vendor?.vendorDocuments?.filter(document => document.f_vendor_document_type_id === DOCUMENT_IDS.ANEX);
    this.getControl('electronic_invoice').setValue(electronic_invoice?.link ? { name: electronic_invoice.link, url: electronic_invoice.link, document_id: electronic_invoice.document_id } : form.electronic_invoice);

    const other_anexos = anexos?.length > 0 ? anexos : form.other_anexos;

    if (other_anexos?.length > 0) {
      for (const anexo of other_anexos) {
        const other_anexo = anexo?.link ? { name: anexo.link, url: anexo.link, document_id: anexo.document_id } : (anexo.document_id ? null : anexo);
        this.addNewAnexFormGroup(other_anexo);
      }
    }
  }

  addNewAnexFormGroup(anexo?: any) {
    this.other_anexos.push(new FormControl(anexo || ''));
  }

  deleteAnnex(index: number) {
    this.other_anexos.removeAt(index);
  }

}
