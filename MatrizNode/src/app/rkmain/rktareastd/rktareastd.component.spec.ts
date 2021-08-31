import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RktareastdComponent } from './rktareastd.component';

describe('RktareastdComponent', () => {
  let component: RktareastdComponent;
  let fixture: ComponentFixture<RktareastdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RktareastdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RktareastdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
