import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutContentComponent } from './content.component';

describe('LayoutContentComponent', () => {
  let component: LayoutContentComponent;
  let fixture: ComponentFixture<LayoutContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
