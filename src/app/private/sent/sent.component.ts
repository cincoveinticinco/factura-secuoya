import { Component } from '@angular/core';
import { LogoComponent } from '../../components';
import { ValidateOcInfoComponent } from '../../pages/validate-oc-info/validate-oc-info.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InfoService } from '../../services';

@Component({
  selector: 'app-sent',
  imports: [
    LogoComponent,
    ValidateOcInfoComponent,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './sent.component.html',
  styleUrl: './sent.component.scss'
})
export class SentComponent {
  sendOcForm: FormGroup;
  emailSent: boolean = false;
  loading: boolean = false;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private infoService: InfoService
  ) {
    this.sendOcForm = this.fb.group({
      email: [''],
      purchaseOrdersIds: [''],
      document: [0]
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      const email = window.history.state.email;
      const purchaseOrdersIds = window.history.state.purchaseOrdersIds;
      const document = window.history.state.document;

      if (email && purchaseOrdersIds) {
        this.sendOcForm.patchValue({
          email,
          purchaseOrdersIds: purchaseOrdersIds.join(', '),
          document
        });
      } else {
        this.router.navigate(['/error']);
      }
    });
  }

  sendForm() {
    this.loading = true;
    this.infoService.sendPurchaseOrdersToEmail(this.sendOcForm.value).subscribe(
      (response: any) => {
        this.loading = false;
        this.emailSent = true;
      });
  }

  backToHome() {
    this.router.navigate(['/']);
  }

  getControl(controlName: string) {
    return this.sendOcForm?.get(controlName);
  }
}
