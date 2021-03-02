import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContainerComponent } from './components/container/container.component';
// import { GameComponent } from './components/game/game.component';


const routes: Routes = [
  // { path: '', component:  GameComponent}
  { path: '', component: ContainerComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameRoutingModule { }