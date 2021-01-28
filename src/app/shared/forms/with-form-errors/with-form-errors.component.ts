import { AfterContentInit, Component, ContentChild, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormControlDirective, FormControlName } from '@angular/forms';

@Component({
  selector: 'ba-with-form-errors',
  templateUrl: './with-form-errors.component.html',
  styleUrls: ['./with-form-errors.component.scss'],
})
export class WithFormErrorsComponent implements AfterContentInit {
  @ContentChild(FormControlName)
  formControlNameDirective: FormControlName | undefined;

  @ContentChild(FormControlDirective)
  formControlDirective: FormControlDirective | undefined;

  control: FormControl | undefined;

  constructor() {}

  ngAfterContentInit(): void {
    const control = this.formControlDirective?.control || this.formControlNameDirective?.control;
    if (!control) {
      console.warn('No form control found to show errors');
    }
    this.control = control;
  }
}
