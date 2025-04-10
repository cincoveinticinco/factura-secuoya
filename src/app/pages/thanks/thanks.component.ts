import { Component, inject } from '@angular/core';
import { LogoComponent } from '../../components';
import { Router } from '@angular/router';

@Component({
  selector: 'app-thanks',
  imports: [
    LogoComponent
  ],
  templateUrl: './thanks.component.html',
  styleUrl: './thanks.component.scss'
})
export class ThanksComponent {

  router = inject(Router);

  loading = false;

  goBack() {
    this.router.navigate(['/']);
  }

}
