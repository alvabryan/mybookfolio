import { TestBed } from '@angular/core/testing';

import { CadetPortfolioService } from './cadet-portfolio.service';

describe('CadetPortfolioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CadetPortfolioService = TestBed.get(CadetPortfolioService);
    expect(service).toBeTruthy();
  });
});
