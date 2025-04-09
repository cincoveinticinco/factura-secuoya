import { Routes } from '@angular/router';
import { InvoiceLoginComponent } from './pages/invoice-login/invoice-login.component';
import { NaturalFormComponent } from './pages/private/natural-form/natural-form.component';
import { JuridicalFormComponent } from './pages/private/juridical-form/juridical-form.component';
import { ThanksComponent } from './pages/thanks/thanks.component';
import { ErrorComponent } from './pages/error/error.component';

export const routes: Routes = [
    {
        path: '',
        component: InvoiceLoginComponent
    },
    {
        path: 'natural-form/:vendor_id',
        component: NaturalFormComponent
    },
    {
        path: 'juridical-form/:vendor_id',
        component: JuridicalFormComponent
    },
    {
        path: 'thanks',
        component: ThanksComponent
    },
    {
        path: 'error',
        component: ErrorComponent
    }
];
