import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardModule } from 'primeng/card'
import { InputTextModule } from 'primeng/inputtext'
import { ButtonModule } from 'primeng/button'
import { MenubarModule } from 'primeng/menubar'
import { ToastModule } from 'primeng/toast'
import {MessageService} from 'primeng/components/common/messageservice'

@NgModule({
  imports: [
    CommonModule,
    CardModule,
    InputTextModule,
    ButtonModule,
    MenubarModule,
    ToastModule
  ],
  exports: [
    CardModule,
    InputTextModule,
    ButtonModule,
    MenubarModule,
    ToastModule
  ],
  providers: [MessageService],
  declarations: []
})
export class UIModule { }
