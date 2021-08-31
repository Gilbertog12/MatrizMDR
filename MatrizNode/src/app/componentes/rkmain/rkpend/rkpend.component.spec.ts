import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RkpendComponent } from './rkpend.component';

describe('RkpendComponent', () => {
  let component: RkpendComponent;
  let fixture: ComponentFixture<RkpendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RkpendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RkpendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
