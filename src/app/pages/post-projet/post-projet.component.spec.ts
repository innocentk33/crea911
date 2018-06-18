import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostProjetComponent } from './post-projet.component';

describe('PostProjetComponent', () => {
  let component: PostProjetComponent;
  let fixture: ComponentFixture<PostProjetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostProjetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
