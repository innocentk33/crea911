import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemCreatifDefaultComponent } from './item-creatif-default.component';

describe('ItemCreatifDefaultComponent', () => {
  let component: ItemCreatifDefaultComponent;
  let fixture: ComponentFixture<ItemCreatifDefaultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemCreatifDefaultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemCreatifDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
