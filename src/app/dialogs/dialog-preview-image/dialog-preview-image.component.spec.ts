import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPreviewImageComponent } from './dialog-preview-image.component';

describe('DialogPreviewImageComponent', () => {
  let component: DialogPreviewImageComponent;
  let fixture: ComponentFixture<DialogPreviewImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogPreviewImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPreviewImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
