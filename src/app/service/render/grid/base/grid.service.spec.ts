import { TestBed, inject } from '@angular/core/testing';

import { GridServiceBase } from './grid.service';

describe('GridServiceBase', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GridServiceBase]
    });
  });

  it('should be created', inject([GridServiceBase], (service: GridServiceBase) => {
    expect(service).toBeTruthy();
  }));
});
