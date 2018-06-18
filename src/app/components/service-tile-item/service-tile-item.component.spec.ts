import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceTileItemComponent } from './service-tile-item.component';

describe('ServiceTileItemComponent', () => {
  let component: ServiceTileItemComponent;
  let fixture: ComponentFixture<ServiceTileItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceTileItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceTileItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
