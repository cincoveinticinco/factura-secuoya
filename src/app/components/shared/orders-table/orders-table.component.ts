import { Component, inject, OnInit } from '@angular/core';
import { PoProjection } from '../../../interfaces/vendor-data.interface';
import { LocalStorageService } from '../../../services';

@Component({
  selector: 'app-orders-table',
  imports: [],
  templateUrl: './orders-table.component.html',
  styleUrl: './orders-table.component.scss'
})
export class OrdersTableComponent implements OnInit {

  projections!: PoProjection[];
  localStorage = inject(LocalStorageService);

  ngOnInit(): void {
      this.setProjections();
  }

  fromNumberToCop(number: number) {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(number);
  }

  setProjections() {
    this.projections = this.localStorage.getVendor().poProjections;
  }

}
