import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithFormErrorsComponent } from './with-form-errors.component';

describe('WithFormErrorsComponent', () => {
  let component: WithFormErrorsComponent;
  let fixture: ComponentFixture<WithFormErrorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WithFormErrorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WithFormErrorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
