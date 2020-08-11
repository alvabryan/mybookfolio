import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAssignmentModelComponent } from './new-assignment-model.component';

describe('NewAssignmentModelComponent', () => {
  let component: NewAssignmentModelComponent;
  let fixture: ComponentFixture<NewAssignmentModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewAssignmentModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAssignmentModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
