import { TestBed, inject } from '@angular/core/testing';

import { UserByIdentifierService } from './user-by-identifier.service';

describe('UserByIdentifierService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserByIdentifierService]
    });
  });

  it('should be created', inject([UserByIdentifierService], (service: UserByIdentifierService) => {
    expect(service).toBeTruthy();
  }));
});
