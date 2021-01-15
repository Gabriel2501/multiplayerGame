import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './components/chat/chat.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { GameLogComponent } from './components/game-log/game-log.component';
import { GameComponent } from './components/game/game.component';



@NgModule({
  declarations: [ChatComponent, UserListComponent, GameLogComponent, GameComponent],
  imports: [
    CommonModule
  ]
})
export class GameModule { }
