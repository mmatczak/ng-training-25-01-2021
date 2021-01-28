import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './dialogs/header/header.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormErrorsComponent } from './forms/form-errors/form-errors.component';
import { WithFormErrorsComponent } from './forms/with-form-errors/with-form-errors.component';
import { NumberInputComponent } from './forms/number-input/number-input.component';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { IataCodeTypeaheadComponent } from './forms/iata-code-typeahead/iata-code-typeahead.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FormErrorsComponent,
    WithFormErrorsComponent,
    NumberInputComponent,
    IataCodeTypeaheadComponent,
  ],
  exports: [
    CommonModule,
    HeaderComponent,
    ReactiveFormsModule,
    FormErrorsComponent,
    WithFormErrorsComponent,
    NumberInputComponent,
    NgbTypeaheadModule,
    IataCodeTypeaheadComponent,
  ],
  imports: [CommonModule, RouterModule, ReactiveFormsModule, NgbTypeaheadModule],
})
export class SharedModule {}
