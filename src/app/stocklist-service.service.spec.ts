import { TestBed } from '@angular/core/testing';

import { StocklistServiceService } from './stocklist-service.service';

describe('StocklistServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StocklistServiceService = TestBed.get(StocklistServiceService);
    expect(service).toBeTruthy();
  });
});
