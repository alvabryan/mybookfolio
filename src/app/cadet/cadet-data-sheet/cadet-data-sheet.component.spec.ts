import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadetDataSheetComponent } from './cadet-data-sheet.component';

describe('CadetDataSheetComponent', () => {
  let component: CadetDataSheetComponent;
  let fixture: ComponentFixture<CadetDataSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadetDataSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadetDataSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
