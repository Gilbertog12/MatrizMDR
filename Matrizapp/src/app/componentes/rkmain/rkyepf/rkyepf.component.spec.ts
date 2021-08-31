import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RkyepfComponent } from './rkyepf.component';

describe('RkyepfComponent', () => {
  let component: RkyepfComponent;
  let fixture: ComponentFixture<RkyepfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RkyepfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RkyepfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
