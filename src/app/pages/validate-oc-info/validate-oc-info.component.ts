import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, InfoService, LocalStorageService } from '../../services';
import { delay, lastValueFrom } from 'rxjs';
import { PERSON_TYPE } from '../../enums/PERSON_TYPE';

@Component({
  selector: 'app-validate-oc-info',
  imports: [],
  templateUrl: './validate-oc-info.component.html',
  styleUrl: './validate-oc-info.component.scss'
})
export class ValidateOcInfoComponent {

  registerId: string | null = null;
  authService = inject(AuthService);
  localService = inject(LocalStorageService);
  infoService = inject(InfoService)

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  async ngOnInit() {
    this.route.params.subscribe(async (params: any) => {
      this.registerId = params.registerId;
      if (this.registerId) {
        await this.authenticateUser();
      }
    });
  }

  private async authenticateUser() {

    try {
      const { status, vendor_id, vendor_token }: any = await lastValueFrom(this.authService.authenticateUserWithRegisterId(this.registerId!));
      this.localService.setToken(vendor_token);
      this.localService.setVendorId(vendor_id);
      const vendor = await lastValueFrom(this.infoService.getFormInitialData());
      this.localService.setVendor(vendor);
      this.navigateTo(vendor.fPersonTypeId, vendor_id);
    } catch (error) {
      console.error('Authentication error:', error);
      this.router.navigate(['/error']);  
    }
  }

    navigateTo(f_person_type: PERSON_TYPE, vendor_id: number) {
      if (f_person_type === PERSON_TYPE.Natural) {
        this.router.navigate(['natural-form', vendor_id]);
        return;
      }
      this.router.navigate(['juridical-form', vendor_id]);
    }

}
