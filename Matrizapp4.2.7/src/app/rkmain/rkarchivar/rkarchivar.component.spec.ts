import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RkarchivarComponent } from './rkarchivar.component';

describe('RkarchivarComponent', () => {
  let component: RkarchivarComponent;
  let fixture: ComponentFixture<RkarchivarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RkarchivarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RkarchivarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
