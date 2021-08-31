import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RkstdtareasComponent } from './rkstdtareas.component';

describe('RkstdtareasComponent', () => {
  let component: RkstdtareasComponent;
  let fixture: ComponentFixture<RkstdtareasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RkstdtareasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RkstdtareasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
