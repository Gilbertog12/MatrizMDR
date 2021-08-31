import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RkyriesgopurotablerComponent } from './rkyriesgopurotabler.component';

describe('RkyriesgopurotablerComponent', () => {
  let component: RkyriesgopurotablerComponent;
  let fixture: ComponentFixture<RkyriesgopurotablerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RkyriesgopurotablerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RkyriesgopurotablerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
