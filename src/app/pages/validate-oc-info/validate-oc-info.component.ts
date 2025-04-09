import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-validate-oc-info',
  imports: [],
  templateUrl: './validate-oc-info.component.html',
  styleUrl: './validate-oc-info.component.scss'
})
export class ValidateOcInfoComponent {

  registerId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      this.registerId = params.registerId;
      if (this.registerId) {
        // setTimeout(() => {
        //   this.router.navigateByUrl('natural-form')
        // }, 2000);
      }
    });
  }

}
