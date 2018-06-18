import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatifPortfolioComponent } from './creatif-portfolio.component';

describe('CreatifPortfolioComponent', () => {
  let component: CreatifPortfolioComponent;
  let fixture: ComponentFixture<CreatifPortfolioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatifPortfolioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatifPortfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
