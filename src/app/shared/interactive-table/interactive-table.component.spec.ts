import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InteractiveTableComponent } from './interactive-table.component';

describe('InteractiveTableComponent', () => {
  let component: InteractiveTableComponent;
  let fixture: ComponentFixture<InteractiveTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InteractiveTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InteractiveTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
