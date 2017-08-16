import { TestBed, inject } from '@angular/core/testing';

import { XMLSerializerService } from './xml-serializer.service';

describe('XMLSerializerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [XMLSerializerService]
    });
  });

  it('should be created', inject([XMLSerializerService], (service: XMLSerializerService) => {
    expect(service).toBeTruthy();
  }));
});
