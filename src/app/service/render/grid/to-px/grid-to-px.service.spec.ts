import { TestBed, inject } from '@angular/core/testing';

import { GridToPxService } from './grid-to-px.service';

describe('GridToPxService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GridToPxService]
    });
  });

  it('should be created', inject([GridToPxService], (service: GridToPxService) => {
    expect(service).toBeTruthy();
  }));
});
