import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialPlanningModule6Component } from './financial-planning-module6.component';

describe('FinancialPlanningModule6Component', () => {
  let component: FinancialPlanningModule6Component;
  let fixture: ComponentFixture<FinancialPlanningModule6Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinancialPlanningModule6Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialPlanningModule6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
