import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentiteVisuelComponent } from './identite-visuel.component';

describe('IdentiteVisuelComponent', () => {
  let component: IdentiteVisuelComponent;
  let fixture: ComponentFixture<IdentiteVisuelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdentiteVisuelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdentiteVisuelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
