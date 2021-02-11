import { LanguageService } from 'src/app/core/services/language.service';
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

    this.logList = [];
    this.messageList = [];
  }

  setupSocketConnection(room: string, username: string) {
    this.socket = io("http://localhost:8080");
    this.socket.emit('new_user', room, username);
    this._room = room;
    this._myUsername = username;

    //Declaração dos métodos que o servidor pode invocar
    this.socket.on('update_users', (data: any) => this.onUpdateUsers(data));
    this.socket.on('message', (data: any) => this.onMessageReceived(data));
    this.socket.on('log_event', (data: any) => this.onLogReceived(data));
    this.socket.on('force_disconnect', (username: string) => this.onDisconnected(username));
  }

  /**
   * 
   * @param event - String representando o nome do evento a ser chamado
   * @param args - Objeto que contem os dados a serem enviados para o servidor. Por padrão, a sala do usuário e seu username são enviados junto ao objeto recebido.
   */
  emitEvent(event: string, ...args: any): void {
    args[0].room = this._room;
    args[0].emitter = this._myUsername;
    this.socket.emit(event, ...args);
  }

  /* 
  -----------------------------------------------------------------------
  Início dos métodos que retornam Observables para os Components
  -----------------------------------------------------------------------
  */
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

  /* 
  -----------------------------------------------------------------------
  Início dos métodos que serão invocados através de mensagens do servidor
  -----------------------------------------------------------------------
  */

  onUpdateUsers(data: any) {
    this.users$.next(data.users);
    this.isAdminUser$.next(data.admin.name === this._myUsername);
  }

  onMessageReceived(data: any) {
    this.messageList.push({ user: data.user, text: data.text });

    //Quantidade de mensagens mostradas, mudar para arquivo de constantes
    if (this.messageList.length > 4) {
      this.messageList.shift();
    }
    this.messages$.next(this.messageList);
  }

  onLogReceived(data: any) {
    this.logList.push({ username: data?.username, logKey: data?.logKey });
    this.log$.next(this.logList);
  }

  onDisconnected(username: string) {
    if (this._myUsername === username) {
      window.location.reload();
    }
  }
}
