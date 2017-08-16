import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallShipPreviewComponent } from './small-ship-preview.component';

describe('SmallShipPreviewComponent', () => {
  let component: SmallShipPreviewComponent;
  let fixture: ComponentFixture<SmallShipPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmallShipPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmallShipPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
