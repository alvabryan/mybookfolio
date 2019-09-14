import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadetChallengeComponent } from './cadet-challenge.component';

describe('CadetChallengeComponent', () => {
  let component: CadetChallengeComponent;
  let fixture: ComponentFixture<CadetChallengeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadetChallengeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadetChallengeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
