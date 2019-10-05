import { TestBed } from '@angular/core/testing';

import { PortfolioViewService } from './portfolio-view.service';

describe('PortfolioViewService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PortfolioViewService = TestBed.get(PortfolioViewService);
    expect(service).toBeTruthy();
  });
});
