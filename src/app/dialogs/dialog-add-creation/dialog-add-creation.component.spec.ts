import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddCreationComponent } from './dialog-add-creation.component';

describe('DialogAddCreationComponent', () => {
  let component: DialogAddCreationComponent;
  let fixture: ComponentFixture<DialogAddCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAddCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
