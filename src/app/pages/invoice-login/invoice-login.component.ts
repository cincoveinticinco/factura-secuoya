import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs';
import { FormBase } from '../../bases/form-base';
import { LogoComponent, SelectInputComponent, TextInputComponent } from '../../components';
import { lastValueFrom } from 'rxjs';
import { DocumentTypes } from '../../interfaces/document-types-response';
import { REQUEST_TYPES } from '../../enums/REQUEST_TYPES';
import { PERSON_TYPE } from '../../enums/PERSON_TYPE';
import { DOCUMENT_TYPE } from '../../enums/DOCUMENT_TYPE';
import { ValidateOcInfoComponent } from '../validate-oc-info/validate-oc-info.component';

@Component({
  selector: 'app-invoice-login',
  imports: [
    ReactiveFormsModule,
    SelectInputComponent,
    TextInputComponent,
    MatTabsModule,
    FormsModule,
    LogoComponent,
    ValidateOcInfoComponent
  ],
  templateUrl: './invoice-login.component.html',
  styleUrl: './invoice-login.component.scss'
})
export class InvoiceLoginComponent extends FormBase {

  loading = false;
  validationPending = false;
  filteredDocumentTypes: {optionValue: number, optionName: string}[] = [];
  documentTypes: DocumentTypes[] = [];
  formattedRequestTypes = [
    {optionName: "Orden de compra", optionValue: REQUEST_TYPES.PURCHASE_ORDER},
    {optionName: "Anticipo", optionValue: REQUEST_TYPES.ANTICIPO}
  ]

  constructor() {
    const form = new FormGroup({
      personType: new FormControl(PERSON_TYPE.Natural, [Validators.required]),
      documentType: new FormControl('', Validators.required),
      documentNumber: new FormControl('', Validators.required),
      requestType: new FormControl(REQUEST_TYPES.PURCHASE_ORDER, Validators.required),
      orderNumber: new FormControl('', Validators.required),
    });
    super(form);
  }

  async ngOnInit() {
    const data = await lastValueFrom(this.infoService.getDocumentTypes());
    this.documentTypes = data;
    this.filterDocumentTypes(PERSON_TYPE.Natural);
  }

  onTabChange(event: MatTabChangeEvent) {
    const selectedIndex = event.index;
    const personTypeId = selectedIndex === 0 ? PERSON_TYPE.Natural : PERSON_TYPE.Juridica;
    this.getControl('documentType').reset();
    this.getControl('documentNumber').reset();
    this.getControl('personType').setValue(personTypeId);
    this.filterDocumentTypes(personTypeId);
  }

  getDocumentPattern() {
    return this.getControl('personType').value === PERSON_TYPE.Natural && this.getControl('documentType')?.value != DOCUMENT_TYPE.CE ? '^[0-9]*$' : '^[a-zA-Z0-9]+$';
  }

  filterDocumentTypes(typePersonId: PERSON_TYPE) {
    this.filteredDocumentTypes = this.documentTypes
      .filter(doc => typePersonId === PERSON_TYPE.Natural ? doc.id !== DOCUMENT_TYPE.NIT : doc.id === DOCUMENT_TYPE.NIT)
      .map(item => ({optionValue: item.id, optionName: item.documentTypeEsp}));
  }

  save() {
    this.validationPending = true;
  }

}
