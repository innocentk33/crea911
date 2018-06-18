import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemFactureRowComponent } from './item-facture-row.component';

describe('ItemFactureRowComponent', () => {
  let component: ItemFactureRowComponent;
  let fixture: ComponentFixture<ItemFactureRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemFactureRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemFactureRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
