import { TestBed, inject } from '@angular/core/testing';

import { ResponseCacheService } from './response-cache.service';

describe('ResponseCacheService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResponseCacheService]
    });
  });

  it('should be created', inject([ResponseCacheService], (service: ResponseCacheService) => {
    expect(service).toBeTruthy();
  }));
});
