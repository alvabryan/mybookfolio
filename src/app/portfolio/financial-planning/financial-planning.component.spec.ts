import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialPlanningComponent } from './financial-planning.component';

describe('FinancialPlanningComponent', () => {
  let component: FinancialPlanningComponent;
  let fixture: ComponentFixture<FinancialPlanningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinancialPlanningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialPlanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});