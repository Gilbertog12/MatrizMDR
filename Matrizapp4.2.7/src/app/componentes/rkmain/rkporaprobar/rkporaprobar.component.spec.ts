import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RkporaprobarComponent } from './rkporaprobar.component';

describe('RkporaprobarComponent', () => {
  let component: RkporaprobarComponent;
  let fixture: ComponentFixture<RkporaprobarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RkporaprobarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RkporaprobarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
