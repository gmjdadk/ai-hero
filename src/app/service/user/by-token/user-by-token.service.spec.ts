import { TestBed, inject } from '@angular/core/testing';

import { UserByTokenService } from './user-by-token.service';

describe('UserByTokenService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserByTokenService]
    });
  });

  it('should be created', inject([UserByTokenService], (service: UserByTokenService) => {
    expect(service).toBeTruthy();
  }));
});
