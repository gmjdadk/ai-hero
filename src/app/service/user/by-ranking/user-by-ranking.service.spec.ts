import { TestBed, inject } from '@angular/core/testing';

import { UserByRankingService } from './user-by-ranking.service';

describe('UserByRankingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserByRankingService]
    });
  });

  it('should be created', inject([UserByRankingService], (service: UserByRankingService) => {
    expect(service).toBeTruthy();
  }));
});
