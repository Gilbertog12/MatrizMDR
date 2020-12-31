import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddrkpComponent } from './addrkp.component';

describe('AddrkpComponent', () => {
  let component: AddrkpComponent;
  let fixture: ComponentFixture<AddrkpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddrkpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddrkpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
