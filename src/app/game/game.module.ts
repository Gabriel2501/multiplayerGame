import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './components/chat/chat.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { GameLogComponent } from './components/game-log/game-log.component';
import { GameComponent } from './components/game/game.component';
import { GameRoutingModule } from './game-routing.module';
import { AngularMaterialModule } from './../angular-material/angular-material.module';
import { MenuComponent } from './menu/menu.component';
import { AjudaComponent } from './menu/ajuda/ajuda.component';
import { SocketioService } from './services/socketio.service';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [
    ChatComponent, 
    UserListComponent, 
    GameLogComponent, 
    GameComponent, 
    MenuComponent, 
    AjudaComponent 
  ],
  imports: [
    CommonModule,
    GameRoutingModule,
    AngularMaterialModule,
    CoreModule
  ]
})
export class GameModule { }
