import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from '../game/components/chat/chat.component';
import { LogComponent } from './components/log/log.component';



@NgModule({
  declarations: [ChatComponent, LogComponent],
  imports: [
    CommonModule
  ],
  exports: [ChatComponent, LogComponent]
})
export class UtilsModule { }
