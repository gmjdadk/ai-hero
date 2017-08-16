import { TestBed, inject } from '@angular/core/testing';

import { UserServiceBase } from './user.service';

describe('UserServiceBase', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserServiceBase]
    });
  });

  it('should be created', inject([UserServiceBase], (service: UserServiceBase) => {
    expect(service).toBeTruthy();
  }));
});
