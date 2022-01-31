import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RkmessagesComponent } from './rkmessages.component';

describe('RkmessagesComponent', () => {
  let component: RkmessagesComponent;
  let fixture: ComponentFixture<RkmessagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RkmessagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RkmessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
