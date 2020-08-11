import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomCardsInstructorComponent } from './custom-cards-instructor.component';

describe('CustomCardsInstructorComponent', () => {
  let component: CustomCardsInstructorComponent;
  let fixture: ComponentFixture<CustomCardsInstructorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomCardsInstructorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomCardsInstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
