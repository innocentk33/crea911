import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepRecapComponent } from './step-recap.component';

describe('StepRecapComponent', () => {
  let component: StepRecapComponent;
  let fixture: ComponentFixture<StepRecapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepRecapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepRecapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
