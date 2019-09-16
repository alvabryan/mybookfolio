import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HumanGraphComponent } from './human-graph.component';

describe('HumanGraphComponent', () => {
  let component: HumanGraphComponent;
  let fixture: ComponentFixture<HumanGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HumanGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HumanGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
