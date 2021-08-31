import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RkyriesgoresidualComponent } from './rkyriesgoresidual.component';

describe('RkyriesgoresidualComponent', () => {
  let component: RkyriesgoresidualComponent;
  let fixture: ComponentFixture<RkyriesgoresidualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RkyriesgoresidualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RkyriesgoresidualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
