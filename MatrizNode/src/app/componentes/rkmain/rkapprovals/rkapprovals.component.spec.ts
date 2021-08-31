import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RkapprovalsComponent } from './rkapprovals.component';

describe('RkapprovalsComponent', () => {
  let component: RkapprovalsComponent;
  let fixture: ComponentFixture<RkapprovalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RkapprovalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RkapprovalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
