import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { ChatComponent } from './components/chat/chat.component';
// import { UserListComponent } from './components/user-list/user-list.component';
// import { GameLogComponent } from './components/game-log/game-log.component';
// import { GameComponent } from './components/game/game.component';
import { GameRoutingModule } from './game-routing.module';
import { AngularMaterialModule } from './../angular-material/angular-material.module';
import { CoreModule } from '../core/core.module';
// import { HelpComponent } from './components/help/help.component';
import { ContainerComponent } from './components/container/container.component';
import { UtilsModule } from '../utils/utils.module';

@NgModule({
  declarations: [
    // ChatComponent,
    // UserListComponent,
    // GameLogComponent,
    // GameComponent,
    // HelpComponent,
    ContainerComponent
  ],
  imports: [
    CommonModule,
    GameRoutingModule,
    AngularMaterialModule,
    CoreModule,
    UtilsModule
  ]
})
export class GameModule { }
