import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './dialogs/header/header.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [HeaderComponent],
  exports: [CommonModule, HeaderComponent],
  imports: [CommonModule, RouterModule],
})
export class SharedModule {}
