import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilCreatifComponent } from './profil-creatif.component';

describe('ProfilCreatifComponent', () => {
  let component: ProfilCreatifComponent;
  let fixture: ComponentFixture<ProfilCreatifComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilCreatifComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilCreatifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
