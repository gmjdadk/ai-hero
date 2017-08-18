import { TestBed, inject } from '@angular/core/testing';

import { StaticFile } from './static-file.model';

describe('StaticFile', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
    });
  });

  it('can be constructed', () => {
    expect(new StaticFile()).toBeTruthy();
  });
});
