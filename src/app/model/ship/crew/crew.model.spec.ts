import { TestBed, inject } from '@angular/core/testing';

import { Crew } from './crew.model';

describe('Crew', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
    });
  });

  it('can be constructed', () => {
    expect(new Crew()).toBeTruthy();
  });
});
