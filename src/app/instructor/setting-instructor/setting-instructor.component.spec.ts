import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingInstructorComponent } from './setting-instructor.component';

describe('SettingInstructorComponent', () => {
  let component: SettingInstructorComponent;
  let fixture: ComponentFixture<SettingInstructorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingInstructorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingInstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
