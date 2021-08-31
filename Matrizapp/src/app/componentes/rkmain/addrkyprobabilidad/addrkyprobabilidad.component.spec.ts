import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddrkyprobabilidadComponent } from './addrkyprobabilidad.component';

describe('AddrkyprobabilidadComponent', () => {
  let component: AddrkyprobabilidadComponent;
  let fixture: ComponentFixture<AddrkyprobabilidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddrkyprobabilidadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddrkyprobabilidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
