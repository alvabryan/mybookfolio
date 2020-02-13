import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalAdComponent } from './personal-ad.component';

describe('PersonalAdComponent', () => {
  let component: PersonalAdComponent;
  let fixture: ComponentFixture<PersonalAdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalAdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
