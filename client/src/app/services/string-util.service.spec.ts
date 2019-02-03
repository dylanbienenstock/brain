import { TestBed, inject } from '@angular/core/testing';

import { StringUtilService } from './string-util.service';

describe('StringUtilService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StringUtilService]
    });
  });

  it('should be created', inject([StringUtilService], (service: StringUtilService) => {
    expect(service).toBeTruthy();
  }));
});
