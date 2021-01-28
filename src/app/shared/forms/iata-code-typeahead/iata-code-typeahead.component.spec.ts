import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IataCodeTypeaheadComponent } from './iata-code-typeahead.component';

describe('IataCodeTypeaheadComponent', () => {
  let component: IataCodeTypeaheadComponent;
  let fixture: ComponentFixture<IataCodeTypeaheadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IataCodeTypeaheadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IataCodeTypeaheadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
