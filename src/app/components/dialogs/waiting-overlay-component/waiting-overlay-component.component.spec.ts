import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitingOverlayComponentComponent } from './waiting-overlay-component.component';

describe('WaitingOverlayComponentComponent', () => {
  let component: WaitingOverlayComponentComponent;
  let fixture: ComponentFixture<WaitingOverlayComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaitingOverlayComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitingOverlayComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
