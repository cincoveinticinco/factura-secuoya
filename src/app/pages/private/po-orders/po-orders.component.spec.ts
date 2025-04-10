import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoOrdersComponent } from './po-orders.component';

describe('PoOrdersComponent', () => {
  let component: PoOrdersComponent;
  let fixture: ComponentFixture<PoOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PoOrdersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
