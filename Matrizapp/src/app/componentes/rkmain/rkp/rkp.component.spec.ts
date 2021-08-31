import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RkpComponent } from './rkp.component';

describe('RkpComponent', () => {
  let component: RkpComponent;
  let fixture: ComponentFixture<RkpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RkpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RkpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
