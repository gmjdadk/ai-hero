import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterTop100RouteComponent } from './filter-top100-route.component';

describe('FilterTop100RouteComponent', () => {
  let component: FilterTop100RouteComponent;
  let fixture: ComponentFixture<FilterTop100RouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterTop100RouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterTop100RouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
