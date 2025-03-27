import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidateOcInfoComponent } from './validate-oc-info.component';

describe('ValidateOcInfoComponent', () => {
  let component: ValidateOcInfoComponent;
  let fixture: ComponentFixture<ValidateOcInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValidateOcInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidateOcInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
