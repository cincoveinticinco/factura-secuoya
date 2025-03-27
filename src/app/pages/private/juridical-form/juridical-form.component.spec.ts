import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuridicalFormComponent } from './juridical-form.component';

describe('JuridicalFormComponent', () => {
  let component: JuridicalFormComponent;
  let fixture: ComponentFixture<JuridicalFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JuridicalFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JuridicalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
