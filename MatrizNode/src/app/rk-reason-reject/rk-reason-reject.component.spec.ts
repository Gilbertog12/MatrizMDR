import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RkReasonRejectComponent } from './rk-reason-reject.component';

describe('RkReasonRejectComponent', () => {
  let component: RkReasonRejectComponent;
  let fixture: ComponentFixture<RkReasonRejectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RkReasonRejectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RkReasonRejectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
