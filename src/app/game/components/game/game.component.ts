import { Component, OnInit } from '@angular/core';

import { SocketioService } from './../../services/socketio.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  constructor(private _socketService: SocketioService) {
    
  }

  ngOnInit() {
    
  }

}
