import { AbstractControl, FormGroup } from "@angular/forms";
import { InfoService } from "../services";
import { inject } from "@angular/core";

export class FormBase {

    parentForm: FormGroup;
    infoService = inject(InfoService);

    constructor(form: FormGroup) {
        this.parentForm = form;
    }

    getControl(name: string): AbstractControl {
        return this.parentForm.get(name)!;
    }

}