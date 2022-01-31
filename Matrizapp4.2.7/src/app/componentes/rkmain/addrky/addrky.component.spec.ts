import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddrkyComponent } from './addrky.component';

describe('AddrkyComponent', () => {
  let component: AddrkyComponent;
  let fixture: ComponentFixture<AddrkyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddrkyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddrkyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
