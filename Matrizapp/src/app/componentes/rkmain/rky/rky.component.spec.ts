import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RkyComponent } from './rky.component';

describe('RkyComponent', () => {
  let component: RkyComponent;
  let fixture: ComponentFixture<RkyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RkyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RkyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
