import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemCreationDefaultComponent } from './item-creation-default.component';

describe('ItemCreationDefaultComponent', () => {
  let component: ItemCreationDefaultComponent;
  let fixture: ComponentFixture<ItemCreationDefaultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemCreationDefaultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemCreationDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
