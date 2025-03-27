import { Component } from '@angular/core';
import { LogoComponent } from '../../components';

@Component({
  selector: 'app-thanks',
  imports: [
    LogoComponent
  ],
  templateUrl: './thanks.component.html',
  styleUrl: './thanks.component.scss'
})
export class ThanksComponent {

  loading = false;

}
