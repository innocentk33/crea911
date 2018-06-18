import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BestcreatifComponent } from './bestcreatif.component';

describe('BestcreatifComponent', () => {
  let component: BestcreatifComponent;
  let fixture: ComponentFixture<BestcreatifComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BestcreatifComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BestcreatifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
