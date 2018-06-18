import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefineNewPasswordComponent } from './define-new-password.component';

describe('DefineNewPasswordComponent', () => {
  let component: DefineNewPasswordComponent;
  let fixture: ComponentFixture<DefineNewPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefineNewPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefineNewPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
