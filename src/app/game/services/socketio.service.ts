import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketioService {

  // private socket: any;
  // private users$: Subject<any[]>;
  // private isAdminUser$: Subject<boolean>;

  // private messages$: Subject<any[]>;
  // private messageList: any[];

  // private log$: Subject<any[]>;
  // private logList: any[];

  // private _room!: string;
  // private _myUsername!: string;

  constructor() {
    // this.users$ = new Subject();
    // this.isAdminUser$ = new Subject();
    // this.messages$ = new Subject();
    // this.log$ = new Subject();

    // this.logList = [];
    // this.messageList = [];
  }

  // setupSocketConnection(room: string, username: string) {
  //   this.socket = io(environment.SOCKET_ENDPOINT);
  //   this._room = room;
  //   this._myUsername = username;

  //   this.emitEvent('new_user', { username: username });

  //   //Declaração dos métodos que o servidor pode invocar
  //   this.socket.on('update_users', (data: any) => this.onUpdateUsers(data));
  //   this.socket.on('message', (data: any) => this.onMessageReceived(data));
  //   this.socket.on('log_event', (data: any) => this.onLogReceived(data));
  //   this.socket.on('force_disconnect', (user: string) => this.onDisconnected(user));
  // }

  /**
   * 
   * @param event - String representando o nome do evento a ser chamado
   * @param args - Objeto que contem os dados a serem enviados para o servidor. Por padrão, a sala do usuário e seu username são enviados junto ao objeto recebido.
   */
  // emitEvent(event: string, ...args: any): void {
  //   args[0].room = this._room;
  //   args[0].emitter = this._myUsername;
  //   this.socket.emit(event, ...args);
  // }

  /* 
  -----------------------------------------------------------------------
  Início dos métodos que retornam Observables para os Components
  -----------------------------------------------------------------------
  */
  // getUsers() {
  //   return this.users$;
  // }

  // isAdmin() {
  //   return this.isAdminUser$;
  // }

  // getMessages() {
  //   return this.messages$;
  // }

  // getLog() {
  //   return this.log$;
  // }

  /* 
  -----------------------------------------------------------------------
  Início dos métodos que serão invocados através de mensagens do servidor
  -----------------------------------------------------------------------
  */

  /**
   * 
   * @param data - Objeto no formato '{users: IUser[], admin: IUser}'
   * 
   * users - representa a lista de usuários
   * 
   * admin - representa o usuário que é administrador da sala
   */
  // onUpdateUsers(data: any) {
  //   this.users$.next(data.users);
  //   this.isAdminUser$.next(data.admin.name === this._myUsername);
  // }

  /**
   * 
   * @param data - oBjeto no formato '{user: string, text: string}'
   * 
   * user - representa o nome de usuário
   * 
   * text - representa a mensagem recebida
   */
  // onMessageReceived(data: any) {
  //   this.messageList.push({ user: data.user, text: data.text });

  //   if (this.messageList.length > 4) {
  //     this.messageList.shift();
  //   }
  //   this.messages$.next(this.messageList);
  // }

  /**
   * 
   * @param data - Objeto no formato '{username: string, logKey: string}'
   * 
   * username - nome de usuário
   * 
   * logKey - chave da string contida no arquivo de idiomas
   */
  // onLogReceived(data: any) {
  //   this.logList.push({ username: data?.username, logKey: data?.logKey });
  //   this.log$.next(this.logList);
  // }

  /**
   * 
   * @param username - string representando nome de usuário
   */
  // onDisconnected(username: string) {
  //   if (this._myUsername === username) {
  //     window.location.reload();
  //   }
  // }
}
