import { Component } from '@angular/core';

@Component({
  selector: 'app-orders-table',
  imports: [],
  templateUrl: './orders-table.component.html',
  styleUrl: './orders-table.component.scss'
})
export class OrdersTableComponent {


  fromNumberToCop(number: number) {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(number);
  }

}
