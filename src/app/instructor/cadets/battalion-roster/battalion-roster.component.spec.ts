import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BattalionRosterComponent } from './battalion-roster.component';

describe('BattalionRosterComponent', () => {
  let component: BattalionRosterComponent;
  let fixture: ComponentFixture<BattalionRosterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BattalionRosterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BattalionRosterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
