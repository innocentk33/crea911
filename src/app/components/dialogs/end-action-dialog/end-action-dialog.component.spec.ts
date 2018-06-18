import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EndActionDialogComponent } from './end-action-dialog.component';

describe('EndActionDialogComponent', () => {
  let component: EndActionDialogComponent;
  let fixture: ComponentFixture<EndActionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EndActionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EndActionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
