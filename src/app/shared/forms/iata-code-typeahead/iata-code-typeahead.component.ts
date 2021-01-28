import { Component, Input, Optional, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import {
  ControlContainer,
  ControlValueAccessor,
  FormControl,
  FormControlDirective,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

const iataCodes = ['FRA', 'HAM', 'WRO', 'JFK'];

@Component({
  selector: 'ba-iata-code-typeahead',
  templateUrl: './iata-code-typeahead.component.html',
  styleUrls: ['./iata-code-typeahead.component.scss'],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: IataCodeTypeaheadComponent, multi: true }],
})
export class IataCodeTypeaheadComponent implements ControlValueAccessor {
  @ViewChild(FormControlDirective, { static: true })
  formControlDirective: FormControlDirective | undefined;

  @Input()
  formControl: FormControl | undefined;

  @Input()
  formControlName: string | undefined;

  constructor(@Optional() private controlContainer: ControlContainer) {}

  get control(): FormControl {
    const control =
      this.formControl || (this.formControlName && this.controlContainer?.control?.get(this.formControlName));
    if (!control) {
      throw new Error();
    }

    return control as FormControl;
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map((term) =>
        term.length < 2 ? [] : iataCodes.filter((v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10),
      ),
    );

  registerOnTouched(fn: any): void {
    this.formControlDirective?.valueAccessor?.registerOnTouched(fn);
  }

  registerOnChange(fn: any): void {
    this.formControlDirective?.valueAccessor?.registerOnChange(fn);
  }

  writeValue(obj: any): void {
    this.formControlDirective?.valueAccessor?.writeValue(obj);
  }

  setDisabledState(isDisabled: boolean): void {
    this.formControlDirective?.valueAccessor?.setDisabledState?.(isDisabled);
  }
}
