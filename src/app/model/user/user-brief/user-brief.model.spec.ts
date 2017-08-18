import { TestBed, inject } from '@angular/core/testing';

import { UserBrief } from './user-brief.model';

describe('UserBrief', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
    });
  });

  it('can be constructed', () => {
    expect(new UserBrief()).toBeTruthy();
  });
});
