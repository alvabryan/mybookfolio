import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareBattalionCodeComponent } from './share-battalion-code.component';

describe('ShareBattalionCodeComponent', () => {
  let component: ShareBattalionCodeComponent;
  let fixture: ComponentFixture<ShareBattalionCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShareBattalionCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareBattalionCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
