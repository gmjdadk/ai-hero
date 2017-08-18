import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderShipComponent } from './render-ship.component';

describe('RenderShipComponent', () => {
  let component: RenderShipComponent;
  let fixture: ComponentFixture<RenderShipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenderShipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenderShipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
