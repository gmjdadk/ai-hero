import { TestBed, inject } from '@angular/core/testing';

import { StaticSprite } from './static-sprite.model';

describe('StaticSprite', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
    });
  });

  it('can be constructed', () => {
    let x = new StaticSprite();
    expect(x).toBeTruthy();
  });
});
