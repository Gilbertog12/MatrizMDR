import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddrkcComponent } from './addrkc.component';

describe('AddrkcComponent', () => {
  let component: AddrkcComponent;
  let fixture: ComponentFixture<AddrkcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddrkcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddrkcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
