import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RkcequipComponent } from './rkcequip.component';

describe('RkcequipComponent', () => {
  let component: RkcequipComponent;
  let fixture: ComponentFixture<RkcequipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RkcequipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RkcequipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
