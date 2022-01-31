import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RkyriesgopurotableComponent } from './rkyriesgopurotable.component';

describe('RkyriesgopurotableComponent', () => {
  let component: RkyriesgopurotableComponent;
  let fixture: ComponentFixture<RkyriesgopurotableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RkyriesgopurotableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RkyriesgopurotableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
