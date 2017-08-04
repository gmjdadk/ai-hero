import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterAllComponent } from './filter-all.component';

describe('FilterAllComponent', () => {
  let component: FilterAllComponent;
  let fixture: ComponentFixture<FilterAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
