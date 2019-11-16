import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadetRegistrationComponent } from './cadet-registration.component';

describe('CadetRegistrationComponent', () => {
  let component: CadetRegistrationComponent;
  let fixture: ComponentFixture<CadetRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadetRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadetRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
