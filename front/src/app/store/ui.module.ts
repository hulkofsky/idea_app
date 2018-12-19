import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardModule } from 'primeng/card'
import { InputTextModule } from 'primeng/inputtext'
import { ButtonModule } from 'primeng/button'

@NgModule({
  imports: [
    CommonModule,
    CardModule,
    InputTextModule,
    ButtonModule
  ],
  exports: [
    CardModule,
    InputTextModule,
    ButtonModule
  ],
  declarations: []
})
export class UIModule { }
