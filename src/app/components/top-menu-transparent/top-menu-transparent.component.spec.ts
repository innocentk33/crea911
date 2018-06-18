import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopMenuTransparentComponent } from './top-menu-transparent.component';

describe('TopMenuTransparentComponent', () => {
  let component: TopMenuTransparentComponent;
  let fixture: ComponentFixture<TopMenuTransparentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopMenuTransparentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopMenuTransparentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
