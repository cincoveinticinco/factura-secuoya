import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-text-input',
  imports: [ReactiveFormsModule, CommonModule, NgxMaskDirective],
  providers: [
    provideNgxMask()
  ],
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.scss'
})
export class TextInputComponent {
  @Input() label: string | undefined;
  @Input() description: string | undefined;
  @Input() placeholder: string = '';
  @Input() control: any = new FormControl();
  @Input() type: string = 'text';
  @Input() pattern?: string | RegExp = '';
  @Input() mask?: string = '';

  @Output() onBlur = new EventEmitter<any>();

  getErrors(): string | null {
    const touched = this.control.touched;
    if (this.control.hasError('required') && touched) {
      return 'Este campo es requerido *';
    }
    if (this.control.hasError('email') && touched) {
      return 'Correo electrónico inválido';
    }
    return this.control.valid ? null : 'Campo inválido';
  }

  blur() {
    this.onBlur.emit();
  }

  ngOnInit(): void {
  }
  
  onlyNumbers(event: KeyboardEvent): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
}
