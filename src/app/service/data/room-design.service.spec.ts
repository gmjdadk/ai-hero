import { TestBed, inject } from '@angular/core/testing';

import { RoomDesignService } from './room-design.service';

describe('RoomDesignService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RoomDesignService]
    });
  });

  it('should be created', inject([RoomDesignService], (service: RoomDesignService) => {
    expect(service).toBeTruthy();
  }));
});
