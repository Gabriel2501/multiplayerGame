import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketioService {

  private socket: any;
  private users$: Subject<[]>;

  constructor() {
    this.users$ = new Subject();
  }

  setupSocketConnection(room: string, username: string) {
    this.socket = io("http://localhost:8080");
    this.socket.emit('new_user', room, username);

    this.socket.on("update_users", (data: any) => {
      this.users$.next(data.users);
    });
  }

  getUsers() {
    return this.users$;
  }
}
