import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketioService {

  private socket: any;
  private users$: Subject<any[]>;
  private isAdminUser$: Subject<boolean>;

  private messages$: Subject<any[]>;
  private messageList: any[];

  private log$: Subject<any[]>;
  private logList: any[];

  private _room!: string;
  private _myUsername!: string;

  constructor() {
    this.users$ = new Subject();
    this.isAdminUser$ = new Subject();
    this.messages$ = new Subject();
    this.log$ = new Subject();

    this.messageList = [];
    this.logList = [];
  }

  setupSocketConnection(room: string, username: string) {
    this.socket = io("http://localhost:8080");
    this.socket.emit('new_user', room, username);
    this._room = room;
    this._myUsername = username;

    this.socket.on('update_users', (data: any) => {
      this.users$.next(data.users);
      this.isAdminUser$.next(data.admin.name === this._myUsername);
    });

    this.socket.on('message', (data: any) => {
      this.messageList.push({ user: data.user, text: data.text });

      //Quantidade de mensagens mostradas, mudar para arquivo de constantes
      if (this.messageList.length > 4) {
        this.messageList.shift();
      }
      this.messages$.next(this.messageList);
    });

    this.socket.on('log_event', (data: any) => {
      this.logList.push(data?.logText);

      this.log$.next(this.logList);
    });

    this.socket.on('force_disconnect', (username: string) => {
      if (this._myUsername === username) {
        window.location.reload();
      }
    });
  }

  emitEvent(event: string, ...args: any): void {
    args[0].room = this._room;
    args[0].emissor = this._myUsername;
    this.socket.emit(event, ...args);
  }

  getUsers() {
    return this.users$;
  }

  isAdmin() {
    return this.isAdminUser$;
  }

  getMessages() {
    return this.messages$;
  }

  getLog() {
    return this.log$;
  }
}
