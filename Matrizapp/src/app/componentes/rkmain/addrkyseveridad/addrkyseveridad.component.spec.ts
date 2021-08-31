import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddrkyseveridadComponent } from './addrkyseveridad.component';

describe('AddrkyseveridadComponent', () => {
  let component: AddrkyseveridadComponent;
  let fixture: ComponentFixture<AddrkyseveridadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddrkyseveridadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddrkyseveridadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
