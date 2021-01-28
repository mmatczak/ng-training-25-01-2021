import { Component } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from '@angular/forms';

@Component({
  selector: 'ba-number-input',
  templateUrl: './number-input.component.html',
  styleUrls: ['./number-input.component.scss'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: NumberInputComponent, multi: true },
    { provide: NG_VALIDATORS, useExisting: NumberInputComponent, multi: true },
  ],
})
export class NumberInputComponent implements ControlValueAccessor, Validator {
  internalValue = '';

  onChangeFn: ((newValue: number) => void) | undefined;
  onTouchedFn: (() => void) | undefined;

  registerOnChange(fn: any): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedFn = fn;
  }

  writeValue(newValue: any): void {
    if (newValue) {
      this.internalValue = newValue;
    }
  }

  notifyAboutChange(event: Event) {
    console.log('input');
    const inputElement = event.target as HTMLInputElement;
    const newValueAsString = inputElement.value;
    this.internalValue = newValueAsString;
    this.onChangeFn?.(+newValueAsString);
  }

  decrement() {
    let internalValueAsNumber = +this.internalValue ?? 1;
    this.internalValue = `${--internalValueAsNumber}`;
    this.onChangeFn?.(internalValueAsNumber);
  }

  increment() {
    let internalValueAsNumber = +this.internalValue ?? 1;
    this.internalValue = `${++internalValueAsNumber}`;
    this.onChangeFn?.(internalValueAsNumber);
  }

  markAsTouched() {
    this.onTouchedFn?.();
  }

  validate(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (isNaN(value)) {
      return {
        notANumber: true,
      };
    }
    return null;
  }
}
