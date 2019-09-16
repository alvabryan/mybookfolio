import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceLearningComponent } from './service-learning.component';

describe('ServiceLearningComponent', () => {
  let component: ServiceLearningComponent;
  let fixture: ComponentFixture<ServiceLearningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceLearningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceLearningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
