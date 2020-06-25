import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BattalionInstructorRegistrationComponent } from './instructor-registration.component';

describe('InstructorRegistrationComponent', () => {
  let component: BattalionInstructorRegistrationComponent;
  let fixture: ComponentFixture<BattalionInstructorRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BattalionInstructorRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BattalionInstructorRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
