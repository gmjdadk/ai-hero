import { TestBed, inject } from '@angular/core/testing';

import { CharacterDesign } from './character-design.model';

describe('CharacterDesign', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
    });
  });

  it('can be constructed', () => {
    let x = new CharacterDesign();
    expect(x).toBeTruthy();
  });
});
