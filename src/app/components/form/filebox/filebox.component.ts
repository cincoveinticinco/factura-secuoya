import { Component, EventEmitter, Input, Optional, Output, Self } from '@angular/core';
import { DialogComponent } from '../../shared/dialog/dialog.component';
import { AbstractControl, FormControl, NgControl, ReactiveFormsModule, ValidationErrors } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DragAndDropFileDirective } from '../../../directives/drag-and-drop-file.directive';
import { DOCUMENT_IDS } from '../../../enums/DOCUMENT_IDS';

@Component({
  selector: 'app-filebox',
  imports: [
    DialogComponent,
    ReactiveFormsModule,
    DragAndDropFileDirective
  ],
  templateUrl: './filebox.component.html',
  styleUrl: './filebox.component.scss'
})
export class FileboxComponent {
  @Input() onlyPdf = true;
  @Input() control: any = new FormControl();
  @Input() name: string = '';
  @Input() allowedExtensions: string[] = ['pdf', 'PDF', 'jpeg', 'jpg', 'png'];

  @Output() onChanges = new EventEmitter<any>()

  private controlValueSubscription: Subscription | undefined;
  onChange = (value: any) => {};
  onTouched = () => {};
  value: any;
  disabled = false;
  fileName: any;
  view = '';
  acceptAllowedExtensions: string = '';

  constructor(@Optional() @Self() public ngControl: NgControl) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  setAllowedExtensions() {
    if (this.onlyPdf) this.allowedExtensions = ['pdf', 'PDF'];
    this.acceptAllowedExtensions = this.allowedExtensions.map(ext => `.${ext}`).join(', ');
  }

  ngOnInit() {
    if (this.control) {
      if(this.control.value) {
        this.value = this.control.value;
        this.view = 'filled';
      }
    }

    this.setAllowedExtensions();
  }

  ngOnDestroy() {
    if (this.controlValueSubscription) {
      this.controlValueSubscription.unsubscribe();
    }
  }

  getErrors(): string | null {
    if (this.control.hasError('required') && (this.control.dirty || this.control.touched)) {
      return 'Este campo es requerido *';
    }
    return null;
  }

  onFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files;
    if (files && files.length > 0) {
      const file = files[0];
      this.value = { file, name: file.name, url: null };
      this.addDocumentId();
      this.onChange(this.value);
      this.control.setValue(this.value);
    }
  }

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    return null;
  }

  onDragFileChange(files: any) {
    if (files && files.length > 0) {
      const file = files[0];
      this.value = { file, name: file.name, url: null };
      this.onChange(this.value);
      this.control.setValue(this.value);
    }
  }

  clearFile() {
    this.control.setValue(null);
    this.value = null;
    this.onChange(this.value);
  }

  writeValue(value: any): void {
    this.value = value;
    if (value) {
      this.view = 'filled';
    } else {
      this.view = '';
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  changeView(newView: string = '') {
    this.view = newView;
  }

  addDocumentId() {
    const ids: any = {
      'template': DOCUMENT_IDS.TEMPLATE,
      'invoice': DOCUMENT_IDS.INVOICE,
      'electronic_invoice': DOCUMENT_IDS.ELECTRONIC_INVOICE
    }
    this.value.document_id = ids[this.name];
  }

}
