import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'ba-form-errors',
  templateUrl: './form-errors.component.html',
  styleUrls: ['./form-errors.component.scss'],
})
export class FormErrorsComponent {
  @HostBinding('class.invalid-feedback')
  invalidFeedback = true;

  errors$: Observable<string[]> | undefined;

  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('of')
  set control(newControl: AbstractControl | undefined | null) {
    if (newControl) {
      this.errors$ = newControl.statusChanges.pipe(
        startWith(newControl.status),
        map((status) => {
          if (status === 'INVALID') {
            return getErrorMessagesOf(newControl);
          }
          return [];
        }),
      );
    }
  }
}

function getErrorMessagesOf(control: AbstractControl | null): string[] {
  const errors = control?.errors;
  return errors
    ? Object.keys(errors).map((errorCode) => {
        switch (errorCode) {
          case 'required':
            return 'Please provide a value';
          case 'maxlength':
            return `The value is too long: max is ${errors[errorCode].requiredLength} character(s)`;
          default:
            return 'Unknown error';
        }
      })
    : [];
}
