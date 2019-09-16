import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WinningColorsComponent } from './winning-colors.component';

describe('WinningColorsComponent', () => {
  let component: WinningColorsComponent;
  let fixture: ComponentFixture<WinningColorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WinningColorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WinningColorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
