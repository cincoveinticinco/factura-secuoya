import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileboxComponent } from './filebox.component';

describe('FileboxComponent', () => {
  let component: FileboxComponent;
  let fixture: ComponentFixture<FileboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileboxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
