import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntakeLogComponent } from './intake-log.component';

describe('IntakeLogComponent', () => {
  let component: IntakeLogComponent;
  let fixture: ComponentFixture<IntakeLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntakeLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntakeLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
