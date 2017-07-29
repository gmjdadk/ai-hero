import { TestBed, inject } from '@angular/core/testing';

import { RoomByShipService } from './room-by-ship.service';

describe('RoomByShipService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RoomByShipService]
    });
  });

  it('should be created', inject([RoomByShipService], (service: RoomByShipService) => {
    expect(service).toBeTruthy();
  }));
});
