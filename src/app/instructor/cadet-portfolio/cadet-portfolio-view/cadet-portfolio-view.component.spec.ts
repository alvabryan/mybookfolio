import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadetPortfolioViewComponent } from './cadet-portfolio-view.component';

describe('CadetPortfolioViewComponent', () => {
  let component: CadetPortfolioViewComponent;
  let fixture: ComponentFixture<CadetPortfolioViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadetPortfolioViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadetPortfolioViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
