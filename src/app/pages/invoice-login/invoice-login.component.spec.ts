import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceLoginComponent } from './invoice-login.component';

describe('InvoiceLoginComponent', () => {
  let component: InvoiceLoginComponent;
  let fixture: ComponentFixture<InvoiceLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoiceLoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoiceLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
