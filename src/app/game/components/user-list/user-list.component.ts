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
  adminView$!: Observable<boolean>;
  isAdmin!: boolean;

  constructor(private _socketioService: SocketioService) {
    this.isAdmin = false;
  }

  ngOnInit(): void {
    this.users$ = this._socketioService.getUsers();

    this.adminView$ = this._socketioService.isAdmin();
    this.adminView$.subscribe((value) => this.isAdmin = value);
  }

  deleteUser(username: string): void {
    this._socketioService.emitEvent("delete_user", { username: username });
  }
}
