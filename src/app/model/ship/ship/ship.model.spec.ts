import { TestBed, inject } from '@angular/core/testing';

import { Ship } from './ship.model';

describe('Ship', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
    });
  });

  it('can be constructed', () => {
    expect(new Ship()).toBeTruthy();
  });
});
