import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddrksComponent } from './addrks.component';

describe('AddrksComponent', () => {
  let component: AddrksComponent;
  let fixture: ComponentFixture<AddrksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddrksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddrksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
