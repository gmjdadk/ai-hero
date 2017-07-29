import { TestBed, inject } from '@angular/core/testing';

import { CrewByUserService } from './crew-by-user.service';

describe('CrewByUserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CrewByUserService]
    });
  });

  it('should be created', inject([CrewByUserService], (service: CrewByUserService) => {
    expect(service).toBeTruthy();
  }));
});
