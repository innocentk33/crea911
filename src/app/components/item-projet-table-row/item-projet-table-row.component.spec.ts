import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemProjetTableRowComponent } from './item-projet-table-row.component';

describe('ItemProjetTableRowComponent', () => {
  let component: ItemProjetTableRowComponent;
  let fixture: ComponentFixture<ItemProjetTableRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemProjetTableRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemProjetTableRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
