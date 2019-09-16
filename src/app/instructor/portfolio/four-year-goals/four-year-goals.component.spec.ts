import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FourYearGoalsComponent } from './four-year-goals.component';

describe('FourYearGoalsComponent', () => {
  let component: FourYearGoalsComponent;
  let fixture: ComponentFixture<FourYearGoalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FourYearGoalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FourYearGoalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
