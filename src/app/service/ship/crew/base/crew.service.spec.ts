import { TestBed, inject } from '@angular/core/testing';

import { CrewServiceBase } from './crew.service';

describe('CrewServiceBase', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CrewServiceBase]
    });
  });

  it('should be created', inject([CrewServiceBase], (service: CrewServiceBase) => {
    expect(service).toBeTruthy();
  }));
});
