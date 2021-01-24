import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketioService {

  private socket: any;
  private users: any;

  constructor() { }

  setupSocketConnection(room: string, username: string) {
    this.socket = io("http://localhost:8080");
    this.socket.emit('new_user', username);

    this.socket.on("update_users", (data: any) => {
      this.users = data.users;
    });
  }

  getUsers() {
    return this.users;
  }
}
