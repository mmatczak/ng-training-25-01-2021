import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './dialogs/header/header.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [HeaderComponent],
  exports: [CommonModule, HeaderComponent, ReactiveFormsModule],
  imports: [CommonModule, RouterModule],
})
export class SharedModule {}
