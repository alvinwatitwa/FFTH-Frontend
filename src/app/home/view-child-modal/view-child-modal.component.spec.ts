import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewChildModalComponent } from './view-child-modal.component';

describe('ViewChildModalComponent', () => {
  let component: ViewChildModalComponent;
  let fixture: ComponentFixture<ViewChildModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewChildModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewChildModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
