import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountDownViewComponent } from './count-down-view.component';

describe('CardProjetComponent', () => {
  let component: CountDownViewComponent;
  let fixture: ComponentFixture<CountDownViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountDownViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountDownViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
