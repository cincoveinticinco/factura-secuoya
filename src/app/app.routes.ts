import { Routes } from '@angular/router';
import { InvoiceLoginComponent } from './pages/invoice-login/invoice-login.component';
import { NaturalFormComponent } from './pages/private/natural-form/natural-form.component';
import { JuridicalFormComponent } from './pages/private/juridical-form/juridical-form.component';
import { ThanksComponent } from './pages/thanks/thanks.component';
import { ErrorComponent } from './pages/error/error.component';
import { PoOrdersComponent } from './pages/private/po-orders/po-orders.component';
import { authGuard } from './guards/auth.guard';
import { SentComponent } from './private/sent/sent.component';
import { ValidateOcInfoComponent } from './pages/validate-oc-info/validate-oc-info.component';

export const routes: Routes = [
    {
        path: '',
        component: InvoiceLoginComponent
    },
    {
        path: 'sent',
        component: SentComponent
    },
    {
        path: 'natural-form/:vendor_id',
        canActivate: [authGuard],
        component: NaturalFormComponent
    },
    {
        path: 'juridical-form/:vendor_id',
        canActivate: [authGuard],
        component: JuridicalFormComponent
    },
    {
        path: 'po-orders',
        canActivate: [authGuard],
        component: PoOrdersComponent
    },
    {
        path: 'thanks',
        component: ThanksComponent
    },
    {
        path: 'error',
        component: ErrorComponent
    },
    {
        path: ':registerId',
        component: ValidateOcInfoComponent
    },
];
