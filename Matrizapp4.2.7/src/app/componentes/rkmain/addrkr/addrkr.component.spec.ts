import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddrkrComponent } from './addrkr.component';

describe('AddrkrComponent', () => {
  let component: AddrkrComponent;
  let fixture: ComponentFixture<AddrkrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddrkrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddrkrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
