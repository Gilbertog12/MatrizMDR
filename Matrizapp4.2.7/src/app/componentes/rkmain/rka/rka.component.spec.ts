import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RkaComponent } from './rka.component';

describe('RkaComponent', () => {
  let component: RkaComponent;
  let fixture: ComponentFixture<RkaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RkaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RkaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
