import { AbstractControl, FormGroup } from "@angular/forms";
import { FileService, GlobalService, InfoService, LocalStorageService } from "../services";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, last, lastValueFrom, map, of, switchMap, throwError } from "rxjs";
import { environment } from "../../environments/environment";
import { HttpEventType } from "@angular/common/http";

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
            await this.submitFile({ value: file, formControl: control });
            await this.sleep(3000); // Delay de 1 segundo entre subidas
          }
        }
    }

    submitFile(event: { value: File; formControl: any }) {
        const { value, formControl } = event;

        const vendorId: any = this.localStorage.getVendorId();

        if (!value) {
          const documentId = formControl.value.document_id;
        //   if (documentId) {
        //     this.vendorService.deleteVendorDocument({ document_id: documentId });
        //   }
        } else {
          const nameFile = this.globalService.normalizeString(value.name);
          const existingUrl = formControl.value.url;
          if (existingUrl) {
            console.log('File already uploaded', existingUrl);
            return;
          }

          this.fileService.getPresignedPutURLOc(nameFile, vendorId, 'register_secuoya')
          .pipe(
            catchError((error) => {
              if (environment?.stage !== 'local') {
                formControl.setValue(null, { emitEvent: false });
                this.errorUploadingDocuments = [...this.errorUploadingDocuments, nameFile];
                this.globalService.openSnackBar(`Fallo al guardar el documento ${nameFile}`, '', 5000);
                return throwError(() => new Error('Error al subir el archivo.'));
              } else {
                return of({ ...value, url: '' });
              }
            }),
            map((putUrl: any) => ({
              ...putUrl,
              id: value,
              file: value,
            })),
            switchMap((uploadFile: any) => {
              if (!uploadFile.url) {
                return of({ blobFile: null, uploadFile });
              }
              return new Promise(resolve => {
                uploadFile.file.arrayBuffer().then((blobFile: File) => resolve({ blobFile, uploadFile }));
              });
            }),
            switchMap((blobUpdateFile: any) => {
              const { blobFile, uploadFile } = blobUpdateFile;
              if (!blobFile) {
                return of(uploadFile);
              }
              return this.fileService.uploadFileUrlPresigned(<File>blobFile, uploadFile.url, uploadFile.file.type)
                .pipe(
                  catchError((_) => {
                    if (environment?.stage !== 'local') {
                      formControl.setValue(null, { emitEvent: false });
                      this.globalService.openSnackBar(`Fallo al guardar el documento ${nameFile}`, '', 5000);
                      this.errorUploadingDocuments = [...this.errorUploadingDocuments, nameFile];
                      return throwError(() => new Error('Error al subir el archivo.'));
                    } else {
                      return of({ ...value, url: '' });
                    }
                  }),
                  map((value) => value.type == HttpEventType.Response ? uploadFile : null)
                );
            }),
            switchMap((uploadFile: any) => {
              if (!uploadFile) return of(false);
              const document_url = uploadFile?.url ? `${vendorId}/${nameFile}` : '';
              const formControlCurrentValue = formControl.value;
              this.fileService.signUrl(document_url).subscribe((res: any) => {
                formControl.setValue({
                  document_id: formControlCurrentValue?.document_id,
                  name: value.name,
                  url: res.url,
                  document_url: document_url
                });
              });
              return of(true);
            })
          )
          .subscribe((value) => {
          });
        }
      }

    // async submitFile(event: { value: File; formControl: AbstractControl }) {
    //     const { value, formControl } = event;

    //     const vendorId: any = this.localStorage.getVendorId();

    //     const nameFile = this.globalService.normalizeString(value.name);
    //     const existingUrl = formControl.value.url;
    //     if (existingUrl) {
    //         console.log('File already uploaded', existingUrl);
    //         return;
    //     }
    //     let putUrl: any;

    //     try {
    //         putUrl = await lastValueFrom(this.fileService.getPresignedPutURLOc(nameFile, vendorId, 'register_secuoya'));
    //     } catch (error) {
    //         if (environment?.stage !== 'local') {
    //             formControl.setValue(null, { emitEvent: false });
    //             this.errorUploadingDocuments = [...this.errorUploadingDocuments, nameFile];
    //             this.globalService.openSnackBar(`Fallo al guardar el documento ${nameFile}`, '', 5000);
    //             return;
    //         } else {
    //             putUrl = { ...value, url: '' };
    //         }
    //     }
    //     const uploadfile = { ...putUrl, id: value, file: value };
    //     let blobFile = value;
    //     if (uploadfile.url) {
    //         blobFile = uploadfile.file.arrayBuffer();
    //     }
    //     await this.uploadFileUrlPresigned({ blobFile, uploadfile }, vendorId, nameFile, formControl, value);
    // }

    async uploadFileUrlPresigned(blobUpdateFile: any, vendorId: string, nameFile: string, formControl: AbstractControl, file: any) {
        const { blobFile, uploadfile } = blobUpdateFile;
        console.log(blobFile)
        if (!blobFile) {
            await this.signUrl(uploadfile, vendorId, nameFile, formControl);
            return;
        }
        try {
            const value = await lastValueFrom(this.fileService.uploadFileUrlPresigned(<File>blobFile, uploadfile.url, uploadfile.file.type));
            const loadFile = value.type == HttpEventType.Response ? uploadfile : null;
            await this.signUrl(loadFile, vendorId, nameFile, formControl);
        } catch (error) {
            console.log(error)
            if (environment?.stage !== 'local') {
                formControl.setValue(null, { emitEvent: false });
                this.globalService.openSnackBar(`Fallo al guardar el documento ${nameFile}`, '', 5000);
                this.errorUploadingDocuments = [...this.errorUploadingDocuments, nameFile];
            } else {
                const loadFile = { ...file, url: '' };
                console.log(uploadfile)
                await this.signUrl(loadFile, vendorId, nameFile, formControl);
            }
        }
    }


    async signUrl(uploadFile: any, vendorId: string, nameFile: string, formControl: AbstractControl) {
        if (!uploadFile) return;
        const document_url = uploadFile?.url ? `${vendorId}/${nameFile}` : '';
        const res: any = await lastValueFrom(this.fileService.signUrl(document_url));
        formControl.setValue({
            document_id: formControl.value?.document_id,
            name: nameFile,
            url: res.url,
            document_url: document_url
        });

    }

    sleep(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    validateFiles(controls: string[]) {
        for (const control of controls) {
            if (!this.getControl(control).value) {
                this.hasError = true;
                break;
            }
            this.hasError = false;
        }
    }

}
