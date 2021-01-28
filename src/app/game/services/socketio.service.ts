import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketioService {

  private socket: any;
  private users$: Subject<[]>;
  private messages$: Subject<any[]>;
  private messageList: any[];
  private _room!: string;
  private _myUsername!: string;

  constructor() {
    this.users$ = new Subject();
    this.messages$ = new Subject();
    this.messageList = [];
  }

  setupSocketConnection(room: string, username: string) {
    this.socket = io("http://localhost:8080");
    this.socket.emit('new_user', room, username);
    this._room = room;
    this._myUsername = username;

    this.socket.on('update_users', (data: any) => {
      this.users$.next(data.users);
    });

    this.socket.on('message', (data: any) => {
      this.messageList.push({ user: data.user, text: data.text });

      //Quantidade de mensagens mostradas, mudar para arquivo de constantes
      if (this.messageList.length > 4) {
        this.messageList.shift();
      }
      this.messages$.next(this.messageList);
    });
  }

  emitEvent(event: string, ...args: any): void {
    args[0].room = this._room;
    args[0].username = this._myUsername;
    this.socket.emit(event, ...args);
  }

  getUsers() {
    return this.users$;
  }

  getMessages() {
    return this.messages$;
  }
}
