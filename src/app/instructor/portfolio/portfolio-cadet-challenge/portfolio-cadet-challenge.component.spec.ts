import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioCadetChallengeComponent } from './portfolio-cadet-challenge.component';

describe('PortfolioCadetChallengeComponent', () => {
  let component: PortfolioCadetChallengeComponent;
  let fixture: ComponentFixture<PortfolioCadetChallengeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortfolioCadetChallengeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioCadetChallengeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
