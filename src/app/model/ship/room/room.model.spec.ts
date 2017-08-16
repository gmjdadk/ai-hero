import { TestBed, inject } from '@angular/core/testing';

import { Room } from './room.model';

describe('Room', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
    });
  });

  it('can be constructed', () => {
    let x = new Room();
    expect(x).toBeTruthy();
  });
});
