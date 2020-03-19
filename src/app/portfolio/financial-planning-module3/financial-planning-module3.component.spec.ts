import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialPlanningModule3Component } from './financial-planning-module3.component';

describe('FinancialPlanningModule3Component', () => {
  let component: FinancialPlanningModule3Component;
  let fixture: ComponentFixture<FinancialPlanningModule3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinancialPlanningModule3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialPlanningModule3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
