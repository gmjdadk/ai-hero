import { TestBed, inject } from '@angular/core/testing';

import { SpriteService } from './sprite.service';

describe('SpriteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpriteService]
    });
  });

  it('should be created', inject([SpriteService], (service: SpriteService) => {
    expect(service).toBeTruthy();
  }));
});
