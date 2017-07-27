import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomPreviewComponent } from './room-preview.component';

describe('RoomPreviewComponent', () => {
  let component: RoomPreviewComponent;
  let fixture: ComponentFixture<RoomPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
