import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipPreviewComponent } from './ship-preview.component';

describe('ShipPreviewComponent', () => {
  let component: ShipPreviewComponent;
  let fixture: ComponentFixture<ShipPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShipPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
