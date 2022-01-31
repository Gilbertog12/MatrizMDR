import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RkrComponent } from './rkr.component';

describe('RkrComponent', () => {
  let component: RkrComponent;
  let fixture: ComponentFixture<RkrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RkrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RkrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
