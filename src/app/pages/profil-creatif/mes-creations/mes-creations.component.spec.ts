import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MesCreationsComponent } from './mes-creations.component';

describe('MesCreationsComponent', () => {
  let component: MesCreationsComponent;
  let fixture: ComponentFixture<MesCreationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MesCreationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MesCreationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
