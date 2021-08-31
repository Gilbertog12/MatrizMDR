import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RkyriesgoresidualtableComponent } from './rkyriesgoresidualtable.component';

describe('RkyriesgoresidualtableComponent', () => {
  let component: RkyriesgoresidualtableComponent;
  let fixture: ComponentFixture<RkyriesgoresidualtableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RkyriesgoresidualtableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RkyriesgoresidualtableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
