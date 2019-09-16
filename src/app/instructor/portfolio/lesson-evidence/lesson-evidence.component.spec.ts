import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonEvidenceComponent } from './lesson-evidence.component';

describe('LessonEvidenceComponent', () => {
  let component: LessonEvidenceComponent;
  let fixture: ComponentFixture<LessonEvidenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LessonEvidenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonEvidenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
