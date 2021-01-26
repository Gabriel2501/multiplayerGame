import { Subject, Observable } from 'rxjs';
import { SocketioService } from './../../services/socketio.service';
import { GameComponent } from './../game/game.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users$!: Observable<any[]>;

  constructor(private _socketioService: SocketioService) {

  }

  ngOnInit(): void {
    this.users$ = this._socketioService.getUsers();
  }
}
