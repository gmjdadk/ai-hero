import { TestBed, inject } from '@angular/core/testing';

import { PersistentHttpService } from './persistent-http.service';

describe('PersistentHttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PersistentHttpService]
    });
  });

  it('should be created', inject([PersistentHttpService], (service: PersistentHttpService) => {
    expect(service).toBeTruthy();
  }));
});
