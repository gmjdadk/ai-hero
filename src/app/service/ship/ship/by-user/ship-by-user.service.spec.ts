import { TestBed, inject } from '@angular/core/testing';

import { ShipByUserService } from './ship-by-user.service';

describe('ShipByUserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShipByUserService]
    });
  });

  it('should be created', inject([ShipByUserService], (service: ShipByUserService) => {
    expect(service).toBeTruthy();
  }));
});
