import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddrkaComponent } from './addrka.component';

describe('AddrkaComponent', () => {
  let component: AddrkaComponent;
  let fixture: ComponentFixture<AddrkaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddrkaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddrkaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
