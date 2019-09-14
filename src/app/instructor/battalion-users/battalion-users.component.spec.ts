import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BattalionUsersComponent } from './battalion-users.component';

describe('BattalionUsersComponent', () => {
  let component: BattalionUsersComponent;
  let fixture: ComponentFixture<BattalionUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BattalionUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BattalionUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
