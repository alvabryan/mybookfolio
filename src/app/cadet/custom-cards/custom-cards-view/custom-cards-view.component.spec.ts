import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomCardsViewComponent } from './custom-cards-view.component';

describe('CustomCardsViewComponent', () => {
  let component: CustomCardsViewComponent;
  let fixture: ComponentFixture<CustomCardsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomCardsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomCardsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
