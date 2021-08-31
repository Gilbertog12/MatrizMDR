import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CajasdashboardComponent } from './cajasdashboard.component';

describe('CajasdashboardComponent', () => {
  let component: CajasdashboardComponent;
  let fixture: ComponentFixture<CajasdashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CajasdashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CajasdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
