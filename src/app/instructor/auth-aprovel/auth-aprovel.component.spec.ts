import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthAprovelComponent } from './auth-aprovel.component';

describe('AuthAprovelComponent', () => {
  let component: AuthAprovelComponent;
  let fixture: ComponentFixture<AuthAprovelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthAprovelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthAprovelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
