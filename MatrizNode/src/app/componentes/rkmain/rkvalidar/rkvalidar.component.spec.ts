import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RkvalidarComponent } from './rkvalidar.component';

describe('RkvalidarComponent', () => {
  let component: RkvalidarComponent;
  let fixture: ComponentFixture<RkvalidarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RkvalidarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RkvalidarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
