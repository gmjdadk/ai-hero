import { TestBed, inject } from '@angular/core/testing';

import { ShipDesign } from './ship-design.model';

describe('ShipDesign', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
    });
  });

  it('can be constructed', () => {
    expect(new ShipDesign()).toBeTruthy();
  });
});
