import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadetInformationComponent } from './cadet-information.component';

describe('CadetInformationComponent', () => {
  let component: CadetInformationComponent;
  let fixture: ComponentFixture<CadetInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadetInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadetInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
