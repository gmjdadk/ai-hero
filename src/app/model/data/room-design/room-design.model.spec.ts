import { TestBed, inject } from '@angular/core/testing';

import { RoomDesign } from './room-design.model';

describe('RoomDesign', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
    });
  });

  it('can be constructed', () => {
    let x = new RoomDesign();
    expect(x).toBeTruthy();
  });
});
