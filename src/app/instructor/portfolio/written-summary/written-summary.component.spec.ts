import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WrittenSummaryComponent } from './written-summary.component';

describe('WrittenSummaryComponent', () => {
  let component: WrittenSummaryComponent;
  let fixture: ComponentFixture<WrittenSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WrittenSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WrittenSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
