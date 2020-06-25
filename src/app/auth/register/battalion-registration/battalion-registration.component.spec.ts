import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BattalionRegistrationComponent } from './battalion-registration.component';

describe('BattalionRegistrationComponent', () => {
  let component: BattalionRegistrationComponent;
  let fixture: ComponentFixture<BattalionRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BattalionRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BattalionRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
