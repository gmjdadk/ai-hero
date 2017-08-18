import { TestBed, inject } from '@angular/core/testing';

import { Room } from './room.model';

describe('Room', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
    });
  });

  it('can be constructed', () => {
    expect(new Room()).toBeTruthy();
  });
});
