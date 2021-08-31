import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RkhelpComponent } from './rkhelp.component';

describe('RkhelpComponent', () => {
  let component: RkhelpComponent;
  let fixture: ComponentFixture<RkhelpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RkhelpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RkhelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
