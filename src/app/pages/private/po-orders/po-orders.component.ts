import { Component, inject } from '@angular/core';
import { OrdersTableComponent } from '../../../components';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { InfoService, LocalStorageService } from '../../../services';
import { PERSON_TYPE } from '../../../enums/PERSON_TYPE';

@Component({
  selector: 'app-po-orders',
  imports: [ OrdersTableComponent ],
  templateUrl: './po-orders.component.html',
  styleUrl: './po-orders.component.scss'
})
export class PoOrdersComponent {

  localStorage = inject(LocalStorageService);
  infoService = inject(InfoService);
  disabled = false;
  errorMsg = '';
  loading = false;

  constructor(
    private router: Router
  ) {
  }

  back() {
    const vendorId = this.localStorage.getVendorId();
    if(this.localStorage.getVendor().fPersonTypeId === PERSON_TYPE.Natural) {
      this.router.navigate(['natural-form', vendorId]);
      return;
    }
    this.router.navigate(['juridical-form', vendorId]);
  }

  async save() {
    this.disabled = true;
    this.loading = true;

    const vendor = this.localStorage.getVendor();
    const params = this.localStorage.getParams();
    params.selected_orders = [ this.localStorage.getVendor().selectedOrders[0].id.toString() ];
    if (vendor.registerCode) params.consecutive_number = +vendor.registerCode;
    const radicateInfo: any = await lastValueFrom(this.infoService.updateRegisterVendor(params));

    if (radicateInfo?.error) {
      this.disabled = false;
      this.loading = false;
      this.errorMsg = radicateInfo?.msg;
      return;
    }
    localStorage.clear();
    this.localStorage.setRadicadoInfo(radicateInfo);
    this.router.navigate(['thanks']);
  }

}
