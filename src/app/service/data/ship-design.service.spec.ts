import { TestBed, inject } from '@angular/core/testing';

import { ShipDesignService } from './ship-design.service';

describe('ShipDesignService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShipDesignService]
    });
  });

  it('should be created', inject([ShipDesignService], (service: ShipDesignService) => {
    expect(service).toBeTruthy();
  }));
});
