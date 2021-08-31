import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RkydocComponent } from './rkydoc.component';

describe('RkydocComponent', () => {
  let component: RkydocComponent;
  let fixture: ComponentFixture<RkydocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RkydocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RkydocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
