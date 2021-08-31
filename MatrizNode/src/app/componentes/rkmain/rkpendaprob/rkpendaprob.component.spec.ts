import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RkpendaprobComponent } from './rkpendaprob.component';

describe('RkpendaprobComponent', () => {
  let component: RkpendaprobComponent;
  let fixture: ComponentFixture<RkpendaprobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RkpendaprobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RkpendaprobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
