import { TestBed, inject } from '@angular/core/testing';

import { RoomByTokenService } from './room-by-token.service';

describe('RoomByTokenService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RoomByTokenService]
    });
  });

  it('should be created', inject([RoomByTokenService], (service: RoomByTokenService) => {
    expect(service).toBeTruthy();
  }));
});
