import { TestBed, inject } from '@angular/core/testing';

import { ShipServiceBase } from './ship.service';

describe('ShipServiceBase', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShipServiceBase]
    });
  });

  it('should be created', inject([ShipServiceBase], (service: ShipServiceBase) => {
    expect(service).toBeTruthy();
  }));
});
