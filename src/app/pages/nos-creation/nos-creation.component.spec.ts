import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NosCreationComponent } from './nos-creation.component';

describe('NosCreationComponent', () => {
  let component: NosCreationComponent;
  let fixture: ComponentFixture<NosCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NosCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NosCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
