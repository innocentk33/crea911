import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebDeigitalComponent } from './web-deigital.component';

describe('WebDeigitalComponent', () => {
  let component: WebDeigitalComponent;
  let fixture: ComponentFixture<WebDeigitalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebDeigitalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebDeigitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
