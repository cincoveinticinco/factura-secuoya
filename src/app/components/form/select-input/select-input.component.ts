import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-select-input',
  imports: [ReactiveFormsModule],
  templateUrl: './select-input.component.html',
  styleUrl: './select-input.component.scss'
})
export class SelectInputComponent {
  @Input() options: any[] = [];
  @Input() description: string = '';
  @Input() label: string = '';
  @Input() optionValue: string = '';
  @Input() optionName: string = '';

  @Input() control: any = new FormControl();

  @Output() change: EventEmitter<any> = new EventEmitter();

  getErrors(): string | null {
    const touched = this.control.touched;
    if (this.control.hasError('required') && touched) {
      return 'Este campo es requerido *';
    }
    return null;
  }

  onChange(event: any): void {
    if(this.change) {
      this.change.emit(event);
    }
  }
}
