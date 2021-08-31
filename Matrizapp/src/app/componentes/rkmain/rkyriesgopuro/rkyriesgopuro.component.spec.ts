import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RkyriesgopuroComponent } from './rkyriesgopuro.component';

describe('RkyriesgopuroComponent', () => {
  let component: RkyriesgopuroComponent;
  let fixture: ComponentFixture<RkyriesgopuroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RkyriesgopuroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RkyriesgopuroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
