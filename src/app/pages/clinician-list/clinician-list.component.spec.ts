import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicianListComponent } from './clinician-list.component';

describe('ClinicianListComponent', () => {
  let component: ClinicianListComponent;
  let fixture: ComponentFixture<ClinicianListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClinicianListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClinicianListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
