import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { FilterTop100Component } from './filter-top100.component';

describe('FilterTop100Component', () => {
  let component: FilterTop100Component;
  let fixture: ComponentFixture<FilterTop100Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterTop100Component ],
      imports: [ RouterTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterTop100Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
