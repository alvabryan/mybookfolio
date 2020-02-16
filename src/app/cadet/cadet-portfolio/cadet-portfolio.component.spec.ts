import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadetPortfolioComponent } from './cadet-portfolio.component';

describe('CadetPortfolioComponent', () => {
  let component: CadetPortfolioComponent;
  let fixture: ComponentFixture<CadetPortfolioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadetPortfolioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadetPortfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
