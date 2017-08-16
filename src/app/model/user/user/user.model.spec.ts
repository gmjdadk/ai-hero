import { TestBed, inject } from '@angular/core/testing';

import { User } from './user.model';
import { UserBrief } from '../user-brief/user-brief.model';

describe('User', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
    });
  });

  it('can be constructed', () => {
    let x = new User();
    expect(x).toBeTruthy();
  });

  it('may be used in place of a UserBrief', () => {
    let x = new User();
    expect(x instanceof UserBrief).toBeTruthy();
  })
});
