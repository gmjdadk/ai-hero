import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterAllRouteComponent } from './filter-all-route.component';

describe('FilterAllRouteComponent', () => {
  let component: FilterAllRouteComponent;
  let fixture: ComponentFixture<FilterAllRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterAllRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterAllRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
