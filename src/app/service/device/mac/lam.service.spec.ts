import { TestBed, inject } from '@angular/core/testing';

import { LocalAdministeredMacService } from './lam.service';

describe('LocalAdministeredMacService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalAdministeredMacService]
    });
  });

  it('should be created', inject([LocalAdministeredMacService], (service: LocalAdministeredMacService) => {
    expect(service).toBeTruthy();
  }));
});
