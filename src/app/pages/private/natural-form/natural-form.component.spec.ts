import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NaturalFormComponent } from './natural-form.component';

describe('NaturalFormComponent', () => {
  let component: NaturalFormComponent;
  let fixture: ComponentFixture<NaturalFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NaturalFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NaturalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
