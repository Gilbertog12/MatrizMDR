import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CajaslinkComponent } from './cajaslink.component';

describe('CajaslinkComponent', () => {
  let component: CajaslinkComponent;
  let fixture: ComponentFixture<CajaslinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CajaslinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CajaslinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
