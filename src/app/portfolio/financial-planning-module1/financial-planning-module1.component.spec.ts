import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialPlanningModule1Component } from './financial-planning-module1.component';

describe('FinancialPlanningModule1Component', () => {
  let component: FinancialPlanningModule1Component;
  let fixture: ComponentFixture<FinancialPlanningModule1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinancialPlanningModule1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialPlanningModule1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
