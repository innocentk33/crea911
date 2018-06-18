import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BandeServiceComponent } from './bande-service.component';

describe('BandeServiceComponent', () => {
  let component: BandeServiceComponent;
  let fixture: ComponentFixture<BandeServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BandeServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BandeServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
