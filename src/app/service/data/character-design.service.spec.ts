import { TestBed, inject } from '@angular/core/testing';

import { CharacterDesignService } from './character-design.service';

describe('CharacterDesignService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CharacterDesignService]
    });
  });

  it('should be created', inject([CharacterDesignService], (service: CharacterDesignService) => {
    expect(service).toBeTruthy();
  }));
});
