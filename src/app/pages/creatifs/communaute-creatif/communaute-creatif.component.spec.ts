import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunauteCreatifComponent } from './communaute-creatif.component';

describe('CommunauteCreatifComponent', () => {
  let component: CommunauteCreatifComponent;
  let fixture: ComponentFixture<CommunauteCreatifComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunauteCreatifComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunauteCreatifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
