import { AbstractControl, FormGroup } from "@angular/forms";
import { InfoService, LocalStorageService } from "../services";
import { inject } from "@angular/core";
import { Router } from "@angular/router";

export class FormBase {

    parentForm: FormGroup;
    infoService = inject(InfoService);
    localStorage = inject(LocalStorageService);
    router = inject(Router);

    constructor(form: FormGroup) {
        this.parentForm = form;
    }

    getControl(name: string): AbstractControl {
        return this.parentForm.get(name)!;
    }

}