import { SocketioService } from './../../services/socketio.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  messages$!: Observable<any[]>;

  constructor(private _socketioService: SocketioService) {
  }

  ngOnInit(): void {
    this.messages$ = this._socketioService.getMessages();
  }

  enviarMensagem(texto: any): void {
    this._socketioService.emitEvent('message', { text: texto.value });
  }
}
