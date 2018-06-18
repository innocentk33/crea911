import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemProjetCreatifTableRowComponent } from './item-projet-creatif-table-row.component';

describe('ItemProjetCreatifTableRowComponent', () => {
  let component: ItemProjetCreatifTableRowComponent;
  let fixture: ComponentFixture<ItemProjetCreatifTableRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemProjetCreatifTableRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemProjetCreatifTableRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
