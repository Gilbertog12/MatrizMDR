import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddrktComponent } from './addrkt.component';

describe('AddrktComponent', () => {
  let component: AddrktComponent;
  let fixture: ComponentFixture<AddrktComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddrktComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddrktComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
