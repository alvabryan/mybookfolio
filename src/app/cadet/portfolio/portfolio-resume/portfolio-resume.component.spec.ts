import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioResumeComponent } from './portfolio-resume.component';

describe('PortfolioResumeComponent', () => {
  let component: PortfolioResumeComponent;
  let fixture: ComponentFixture<PortfolioResumeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortfolioResumeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
