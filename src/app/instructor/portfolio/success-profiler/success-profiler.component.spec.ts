import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessProfilerComponent } from './success-profiler.component';

describe('SuccessProfilerComponent', () => {
  let component: SuccessProfilerComponent;
  let fixture: ComponentFixture<SuccessProfilerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuccessProfilerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessProfilerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
