import { TestBed, inject } from '@angular/core/testing';

import { CrewByShipService } from './crew-by-ship.service';

describe('CrewByShipService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CrewByShipService]
    });
  });

  it('should be created', inject([CrewByShipService], (service: CrewByShipService) => {
    expect(service).toBeTruthy();
  }));
});
