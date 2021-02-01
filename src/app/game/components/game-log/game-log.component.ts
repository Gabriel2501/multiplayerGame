import { SocketioService } from './../../services/socketio.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-game-log',
  templateUrl: './game-log.component.html',
  styleUrls: ['./game-log.component.scss']
})
export class GameLogComponent implements OnInit {

  adminView$!: Observable<boolean>;
  isAdmin!: boolean;

  constructor(private _socketioService: SocketioService) {
    this.isAdmin = false;
  }

  ngOnInit(): void {
    this.adminView$ = this._socketioService.isAdmin();
    this.adminView$.subscribe((value) => this.isAdmin = value);
  }

  startGame(): void {
    this._socketioService.emitEvent("start_game", {});
  }

}
