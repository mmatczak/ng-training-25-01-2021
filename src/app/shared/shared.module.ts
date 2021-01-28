import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './dialogs/header/header.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormErrorsComponent } from './forms/form-errors/form-errors.component';
import { WithFormErrorsComponent } from './forms/with-form-errors/with-form-errors.component';
import { NumberInputComponent } from './forms/number-input/number-input.component';

@NgModule({
  declarations: [HeaderComponent, FormErrorsComponent, WithFormErrorsComponent, NumberInputComponent],
  exports: [
    CommonModule,
    HeaderComponent,
    ReactiveFormsModule,
    FormErrorsComponent,
    WithFormErrorsComponent,
    NumberInputComponent,
  ],
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
})
export class SharedModule {}
