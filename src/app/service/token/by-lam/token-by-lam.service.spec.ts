import { TestBed, inject } from '@angular/core/testing';

import { TokenByLamService } from './token-by-lam.service';

describe('TokenByLamService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TokenByLamService]
    });
  });

  it('should be created', inject([TokenByLamService], (service: TokenByLamService) => {
    expect(service).toBeTruthy();
  }));
});
