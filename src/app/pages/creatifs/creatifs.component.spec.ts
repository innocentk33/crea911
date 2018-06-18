import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatifsComponent } from './creatifs.component';

describe('CreatifsComponent', () => {
  let component: CreatifsComponent;
  let fixture: ComponentFixture<CreatifsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatifsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatifsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
