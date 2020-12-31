import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RkyriesgoresidualtablerComponent } from './rkyriesgoresidualtabler.component';

describe('RkyriesgoresidualtablerComponent', () => {
  let component: RkyriesgoresidualtablerComponent;
  let fixture: ComponentFixture<RkyriesgoresidualtablerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RkyriesgoresidualtablerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RkyriesgoresidualtablerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
