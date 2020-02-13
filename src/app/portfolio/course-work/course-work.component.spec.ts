import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseWorkComponent } from './course-work.component';

describe('CourseWorkComponent', () => {
  let component: CourseWorkComponent;
  let fixture: ComponentFixture<CourseWorkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseWorkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
