import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemMyCreaComponent } from './item-my-crea.component';

describe('ItemMyCreaComponent', () => {
  let component: ItemMyCreaComponent;
  let fixture: ComponentFixture<ItemMyCreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemMyCreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemMyCreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
