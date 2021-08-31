import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RktComponent } from './rkt.component';

describe('RktComponent', () => {
  let component: RktComponent;
  let fixture: ComponentFixture<RktComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RktComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RktComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
