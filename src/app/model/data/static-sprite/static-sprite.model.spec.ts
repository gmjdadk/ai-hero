import { TestBed, inject } from '@angular/core/testing';

import { StaticSprite } from './static-sprite.model';

describe('StaticSprite', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
    });
  });

  it('can be constructed', () => {
    expect(new StaticSprite()).toBeTruthy();
  });
});
