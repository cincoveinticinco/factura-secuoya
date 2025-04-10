import { Component, inject } from '@angular/core';
import { LogoComponent } from '../../components';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { LocalStorageService } from '../../services';

@Component({
  selector: 'app-thanks',
  imports: [
    LogoComponent,
    DatePipe
  ],
  templateUrl: './thanks.component.html',
  styleUrl: './thanks.component.scss'
})
export class ThanksComponent {

  localStorage = inject(LocalStorageService);
  radicado: string = '';
  url: string = '';
  date: string = '';

  router = inject(Router);

  loading = false;

  ngOnInit() {
    this.setData();
  }

  setData() {
    const radicateInfo = this.localStorage.getRadicadoInfo();
    this.radicado = radicateInfo.radicado;
    this.url = radicateInfo.url;
    this.date = radicateInfo.registerDate;
  }

  goBack() {
    this.router.navigate(['/']);
  }

}
