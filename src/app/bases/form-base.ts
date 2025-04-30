import { AbstractControl, FormArray, FormControl, FormGroup } from "@angular/forms";
import { FileService, GlobalService, InfoService, LocalStorageService } from "../services";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, filter, firstValueFrom, last, lastValueFrom, map, of, switchMap, throwError } from "rxjs";
import { environment } from "../../environments/environment";
import { HttpEventType } from "@angular/common/http";
import { DOCUMENT_IDS } from "../enums/DOCUMENT_IDS";

export class FormBase {

  parentForm: FormGroup;
  infoService = inject(InfoService);
  localStorage = inject(LocalStorageService);
  fileService = inject(FileService);
  globalService = inject(GlobalService)
  router = inject(Router);

  errorUploadingDocuments: string[] = [];
  hasError = false;


  constructor(form: FormGroup) {
    this.parentForm = form;
  }

  getControl(name: string): AbstractControl {
    return this.parentForm.get(name)!;
  }

  async uploadFiles(controlNames: string[]): Promise<void> {
    for (const controlName of controlNames) {
      const control = this.getControl(controlName);
      const file = control.value?.file;

      if (file) {
        try {
          await this.submitFile({ value: file, formControl: control });
        } catch (error) {
          this.globalService.openSnackBar(`Error al subir ${file.name}`, '', 5000);
        }
      }
    }
  }

  async uploadFilesFromArrayOfControls(controlArray: FormArray): Promise<void> {
    for (const control of controlArray.controls) {
      const file = control.value?.file;
      if (file) {
        try {
          await this.submitFile({ value: file, formControl: control as FormControl });
        } catch (error) {
          this.globalService.openSnackBar(`Error al subir ${file.name}`, '', 5000);
        }
      }
    }
  }

  async submitFile(event: { value: File; formControl: AbstractControl }): Promise<void> {
    if (!event.value?.name) return;
    const { value, formControl } = event;

    const existingUrl = formControl.value.url;
    if (existingUrl) return;

    const vendorId = this.localStorage.getVendorId() || '';
    if (!vendorId) return;

    if (environment?.stage === 'local') {
      formControl.setValue({
        document_id: formControl.value?.document_id,
        name: value.name,
        url: `${vendorId}/test.pdf`,
        document_url: `${vendorId}/test.pdf`,
      });

      return;
    }

    try {
      const nameFile = this.globalService.normalizeString(value.name);

      await firstValueFrom(
        this.fileService.getPresignedPutURLOc(nameFile, vendorId, 'register_secuoya').pipe(
          catchError(() => {
            formControl.setValue(null, { emitEvent: false });
            this.errorUploadingDocuments = [...this.errorUploadingDocuments, nameFile];
            this.globalService.openSnackBar(`Fallo al guardar el documento ${nameFile}`, '', 5000);

            return throwError(() => new Error('Error al subir el archivo.'));
          }),
          map(putUrl => ({
            ...putUrl,
            file: value,
          })),
          switchMap((uploadFile: { url: string, file: File }) => {
            if (!uploadFile.url) {
              formControl.setValue(null, { emitEvent: false });
              return throwError(() => new Error('Falta url.'));
            }

            return new Promise(resolve => {
              uploadFile.file.arrayBuffer().then(blobFile => resolve({ blobFile, uploadFile }));
            });
          }),
          switchMap((blobUpdateFile: any) => {
            const { blobFile, uploadFile } = blobUpdateFile;

            return this.fileService.uploadFileUrlPresigned(blobFile, uploadFile.url, uploadFile.file.type).pipe(
              catchError(() => {
                formControl.setValue(null, { emitEvent: false });
                this.globalService.openSnackBar(`Fallo al guardar el documento ${nameFile}`, '', 5000);
                this.errorUploadingDocuments = [...this.errorUploadingDocuments, nameFile];

                return throwError(() => new Error('Error al subir el archivo.'));
              }),
              filter(event => event.type === HttpEventType.Response),
              map(() => uploadFile)
            );
          }),
          switchMap(() => {
            const document_url = `${vendorId}/${nameFile}`;
            const formControlCurrentValue = formControl.value;

            return this.fileService.signUrl(document_url).pipe(
              map((res: any) => {
                formControl.setValue({
                  document_id: formControlCurrentValue?.document_id,
                  name: value.name,
                  url: res.url,
                  document_url: document_url
                });

                return true;
              })
            );
          })
        )
      );
    } catch (error) {
      console.error('Error en submitFile:', error);
    }

  }

  validateFiles(controls: string[]) {
    for (const control of controls) {
      this.setControls(control);
      if (!this.getControl(control).value) {
        this.hasError = true;
        break;
      }
      this.hasError = false;
    }
  }

  setControls(control: string) {
    const { vendor } = this.localStorage.getVendor();
    const ids: any = {
      'invoice': DOCUMENT_IDS.INVOICE,
      'electronic_invoice': DOCUMENT_IDS.ELECTRONIC_INVOICE,
      'template': DOCUMENT_IDS.TEMPLATE,
      'other_anexos': DOCUMENT_IDS.ANEX,
    }
    const documents = vendor?.vendorDocuments?.filter(document => document.f_vendor_document_type_id === ids[control]);

    if (!documents || documents?.length === 0) {
      return;
    }

    if (this.getControl(control).value.length > 0) {
      const array = this.getControl(control) as FormArray;
      for (const document of documents) {
        const controlWithoutDocumentId = array.controls.find(control => !control.value.document_id);
        if (array.getRawValue().some(value => value.document_id === document.document_id)) continue;
        if (!controlWithoutDocumentId?.value.name) continue;
        controlWithoutDocumentId.setValue({ ...controlWithoutDocumentId.value, document_id: document.document_id });
      }
    } else {
      this.getControl(control).setValue({ ...this.getControl(control).value, document_id: documents[0].document_id });
    }
  }

}
