import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './dialogs/header/header.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormErrorsComponent } from './forms/form-errors/form-errors.component';

@NgModule({
  declarations: [HeaderComponent, FormErrorsComponent],
  exports: [CommonModule, HeaderComponent, ReactiveFormsModule, FormErrorsComponent],
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
})
export class SharedModule {}
