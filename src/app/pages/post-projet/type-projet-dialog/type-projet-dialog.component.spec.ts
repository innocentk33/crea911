import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeProjetDialogComponent } from './type-projet-dialog.component';

describe('TypeProjetDialogComponent', () => {
  let component: TypeProjetDialogComponent;
  let fixture: ComponentFixture<TypeProjetDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeProjetDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeProjetDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
