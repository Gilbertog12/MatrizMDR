import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RkycduroComponent } from './rkycduro.component';

describe('RkycduroComponent', () => {
  let component: RkycduroComponent;
  let fixture: ComponentFixture<RkycduroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RkycduroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RkycduroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
