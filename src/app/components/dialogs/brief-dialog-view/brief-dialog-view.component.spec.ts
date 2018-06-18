import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BriefDialogViewComponent } from './brief-dialog-view.component';

describe('BriefDialogViewComponent', () => {
  let component: BriefDialogViewComponent;
  let fixture: ComponentFixture<BriefDialogViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BriefDialogViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BriefDialogViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
