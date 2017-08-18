import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRouteComponent } from './user.component';

describe('UserRouteComponent', () => {
  let component: UserRouteComponent;
  let fixture: ComponentFixture<UserRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
