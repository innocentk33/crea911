import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MesprojetsComponent } from './mesprojets.component';

describe('MesprojetsComponent', () => {
  let component: MesprojetsComponent;
  let fixture: ComponentFixture<MesprojetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MesprojetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MesprojetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
