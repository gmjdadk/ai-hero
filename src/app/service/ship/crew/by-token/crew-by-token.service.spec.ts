import { TestBed, inject } from '@angular/core/testing';

import { CrewByTokenService } from './crew-by-token.provider';

describe('CrewByTokenService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CrewByTokenService]
    });
  });

  it('should be created', inject([CrewByTokenService], (service: CrewByTokenService) => {
    expect(service).toBeTruthy();
  }));
});
