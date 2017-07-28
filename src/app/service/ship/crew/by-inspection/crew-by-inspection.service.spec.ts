import { TestBed, inject } from '@angular/core/testing';

import { CrewByInspectionService } from './crew-by-inspection.service';

describe('CrewByInspectionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CrewByInspectionService]
    });
  });

  it('should be created', inject([CrewByInspectionService], (service: CrewByInspectionService) => {
    expect(service).toBeTruthy();
  }));
});
