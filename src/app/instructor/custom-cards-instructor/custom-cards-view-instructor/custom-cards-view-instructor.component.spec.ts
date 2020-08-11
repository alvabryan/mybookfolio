import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomCardsViewInstructorComponent } from './custom-cards-view-instructor.component';

describe('CustomCardsViewInstructorComponent', () => {
  let component: CustomCardsViewInstructorComponent;
  let fixture: ComponentFixture<CustomCardsViewInstructorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomCardsViewInstructorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomCardsViewInstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
