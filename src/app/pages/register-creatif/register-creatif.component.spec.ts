import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterCreatifComponent } from './register-creatif.component';

describe('RegisterCreatifComponent', () => {
  let component: RegisterCreatifComponent;
  let fixture: ComponentFixture<RegisterCreatifComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterCreatifComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterCreatifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
