import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorRegistrationComponent } from './instructor-registration.component';

describe('InstructorRegistrationComponent', () => {
  let component: InstructorRegistrationComponent;
  let fixture: ComponentFixture<InstructorRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstructorRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructorRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
