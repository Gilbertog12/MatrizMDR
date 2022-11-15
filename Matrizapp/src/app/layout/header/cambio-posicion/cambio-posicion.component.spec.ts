import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CambioPosicionComponent } from './cambio-posicion.component';

describe('CambioPosicionComponent', () => {
  let component: CambioPosicionComponent;
  let fixture: ComponentFixture<CambioPosicionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CambioPosicionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CambioPosicionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
