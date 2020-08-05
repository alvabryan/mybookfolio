import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomCardsComponent } from './custom-cards.component';

describe('CustomCardsComponent', () => {
  let component: CustomCardsComponent;
  let fixture: ComponentFixture<CustomCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
