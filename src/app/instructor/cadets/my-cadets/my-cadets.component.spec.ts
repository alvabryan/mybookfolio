import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCadetsComponent } from './my-cadets.component';

describe('MyCadetsComponent', () => {
  let component: MyCadetsComponent;
  let fixture: ComponentFixture<MyCadetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyCadetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCadetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
