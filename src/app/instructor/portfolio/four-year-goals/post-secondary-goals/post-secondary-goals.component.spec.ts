import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostSecondaryGoalsComponent } from './post-secondary-goals.component';

describe('PostSecondaryGoalsComponent', () => {
  let component: PostSecondaryGoalsComponent;
  let fixture: ComponentFixture<PostSecondaryGoalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostSecondaryGoalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostSecondaryGoalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
