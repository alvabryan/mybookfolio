import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialPlanningModule4Component } from './financial-planning-module4.component';

describe('FinancialPlanningModule4Component', () => {
  let component: FinancialPlanningModule4Component;
  let fixture: ComponentFixture<FinancialPlanningModule4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinancialPlanningModule4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialPlanningModule4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
