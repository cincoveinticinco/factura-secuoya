import { Routes } from '@angular/router';
import { InvoiceLoginComponent } from './pages/invoice-login/invoice-login.component';
import { NaturalFormComponent } from './pages/private/natural-form/natural-form.component';
import { JuridicalFormComponent } from './pages/private/juridical-form/juridical-form.component';

export const routes: Routes = [
    {
        path: '',
        component: InvoiceLoginComponent
    },
    {
        path: 'natural-form',
        component: NaturalFormComponent
    },
    {
        path: 'juridical-form',
        component: JuridicalFormComponent
    },
];
