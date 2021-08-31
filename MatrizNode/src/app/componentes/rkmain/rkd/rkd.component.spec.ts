import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RkdComponent } from './rkd.component';

describe('RkdComponent', () => {
  let component: RkdComponent;
  let fixture: ComponentFixture<RkdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RkdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RkdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
