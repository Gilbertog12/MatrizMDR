import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RkcstdjobComponent } from './rkcstdjob.component';

describe('RkcstdjobComponent', () => {
  let component: RkcstdjobComponent;
  let fixture: ComponentFixture<RkcstdjobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RkcstdjobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RkcstdjobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
