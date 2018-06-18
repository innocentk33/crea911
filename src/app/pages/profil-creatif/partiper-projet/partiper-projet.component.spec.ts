import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartiperProjetComponent } from './partiper-projet.component';

describe('PartiperProjetComponent', () => {
  let component: PartiperProjetComponent;
  let fixture: ComponentFixture<PartiperProjetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartiperProjetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartiperProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
