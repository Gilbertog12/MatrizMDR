import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RkcComponent } from './rkc.component';

describe('RkcComponent', () => {
  let component: RkcComponent;
  let fixture: ComponentFixture<RkcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RkcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RkcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
