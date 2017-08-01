import { TestBed, inject } from '@angular/core/testing';

import { TokenServiceBase } from './token.service';

describe('TokenServiceBase', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TokenServiceBase]
    });
  });

  it('should be created', inject([TokenServiceBase], (service: TokenServiceBase) => {
    expect(service).toBeTruthy();
  }));
});
