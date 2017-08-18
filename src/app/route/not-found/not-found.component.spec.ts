import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotFoundRouteComponent } from './not-found.component';

describe('NotFoundRouteComponent', () => {
  let component: NotFoundRouteComponent;
  let fixture: ComponentFixture<NotFoundRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotFoundRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotFoundRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
