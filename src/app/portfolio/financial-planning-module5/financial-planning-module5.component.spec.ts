import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialPlanningModule5Component } from './financial-planning-module5.component';

describe('FinancialPlanningModule5Component', () => {
  let component: FinancialPlanningModule5Component;
  let fixture: ComponentFixture<FinancialPlanningModule5Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinancialPlanningModule5Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialPlanningModule5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
