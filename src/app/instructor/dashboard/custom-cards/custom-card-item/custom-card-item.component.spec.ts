import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomCardItemComponent } from './custom-card-item.component';

describe('CustomCardItemComponent', () => {
  let component: CustomCardItemComponent;
  let fixture: ComponentFixture<CustomCardItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomCardItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomCardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
