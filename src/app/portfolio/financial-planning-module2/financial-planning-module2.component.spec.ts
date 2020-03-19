import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialPlanningModule2Component } from './financial-planning-module2.component';

describe('FinancialPlanningModule2Component', () => {
  let component: FinancialPlanningModule2Component;
  let fixture: ComponentFixture<FinancialPlanningModule2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinancialPlanningModule2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialPlanningModule2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
