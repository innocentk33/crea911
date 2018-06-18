import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignDespaceComponent } from './design-despace.component';

describe('DesignDespaceComponent', () => {
  let component: DesignDespaceComponent;
  let fixture: ComponentFixture<DesignDespaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesignDespaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignDespaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
