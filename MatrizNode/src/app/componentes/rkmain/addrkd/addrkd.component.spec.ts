import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddrkdComponent } from './addrkd.component';

describe('AddrkdComponent', () => {
  let component: AddrkdComponent;
  let fixture: ComponentFixture<AddrkdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddrkdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddrkdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
