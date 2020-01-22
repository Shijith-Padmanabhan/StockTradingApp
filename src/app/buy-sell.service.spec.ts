import { TestBed } from '@angular/core/testing';

import { BuySellService } from './buy-sell.service';

describe('BuySellService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BuySellService = TestBed.get(BuySellService);
    expect(service).toBeTruthy();
  });
});
