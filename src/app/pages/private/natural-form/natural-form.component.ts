import { Component } from '@angular/core';
import { LogoComponent, TextInputComponent, OrdersTableComponent, FileboxComponent, SubtitleComponent } from '../../../components';
import { FormBase } from '../../../bases/form-base';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-natural-form',
  imports: [
    LogoComponent,
    SubtitleComponent,
    TextInputComponent,
    FileboxComponent,
    OrdersTableComponent
  ],
  templateUrl: './natural-form.component.html',
  styleUrl: './natural-form.component.scss'
})
export class NaturalFormComponent extends FormBase {

  loading = false;

  constructor() {
    const form = new FormGroup({
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


}
