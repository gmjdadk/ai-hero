import { TestBed, inject } from '@angular/core/testing';

import { UserByNameService } from './user-by-name.service';

describe('UserByNameService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserByNameService]
    });
  });

  it('should be created', inject([UserByNameService], (service: UserByNameService) => {
    expect(service).toBeTruthy();
  }));
});
