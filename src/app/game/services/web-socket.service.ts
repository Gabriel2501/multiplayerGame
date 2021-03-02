import { Injectable } from '@angular/core';
import { ChatService } from 'src/app/utils/services/chat.service';
import { LogService } from 'src/app/utils/services/log.service';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  constructor(
    private _logService: LogService,
    private _chatService: ChatService
  ) { }
}
