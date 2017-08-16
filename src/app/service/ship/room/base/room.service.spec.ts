import { TestBed, inject } from '@angular/core/testing';

import { RoomServiceBase } from './room.service';

describe('RoomServiceBase', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RoomServiceBase]
    });
  });

  it('should be created', inject([RoomServiceBase], (service: RoomServiceBase) => {
    expect(service).toBeTruthy();
  }));
});
