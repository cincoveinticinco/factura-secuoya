import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class GlobalService {

    constructor(private _snackBar: MatSnackBar) { }

  
    normalizeString(strAccents:string) {
        return strAccents.replace(/\s/g, '_').normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    openSnackBar(message: string, action: string = 'X', duration: number = 10000) {
            this._snackBar.open(message, action, {
                duration: duration,
            });
        }

    formatDate(isoDate: string): string {
        const date = new Date(isoDate);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
    
        return `${day}/${month}/${year}`;
    }
}