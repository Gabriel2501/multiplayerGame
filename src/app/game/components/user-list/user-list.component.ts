import { SocketioService } from './../../services/socketio.service';
import { GameComponent } from './../game/game.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: string[] = [];

  constructor(private _socketioService: SocketioService) {
    setInterval(() => {
      this.updateUsers();
    }, 500);
    
  }

  ngOnInit(): void {

  }

  updateUsers() {
    this.users = this._socketioService.getUsers();
  }
}
