import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormBase } from '../../../bases/form-base';
import { FileboxComponent, LogoComponent, OrdersTableComponent, SubtitleComponent, TextInputComponent } from '../../../components';

@Component({
  selector: 'app-juridical-form',
  imports: [
    LogoComponent,
    SubtitleComponent,
    TextInputComponent,
    FileboxComponent,
    OrdersTableComponent
  ],
  templateUrl: './juridical-form.component.html',
  styleUrl: './juridical-form.component.scss'
})
export class JuridicalFormComponent extends FormBase {

  loading = false;

  constructor() {
    const form = new FormGroup({
      personType: new FormControl({value:'', disabled: true}, Validators.required),
      documentType: new FormControl({value:'', disabled: true}, Validators.required),
      documentNumber: new FormControl({value:'', disabled: true}, Validators.required),
      companyName: new FormControl({value:'', disabled: true}, Validators.required),
      address: new FormControl({value:'', disabled: true}, Validators.required),
      email: new FormControl({value:'', disabled: true}, Validators.required),
      invoice: new FormControl({value:'', disabled: true}, Validators.required),
    });

    super(form);
  }

}
