import { Component, OnInit } from '@angular/core';
import { NavbarConfig } from 'src/app/core/interfaces/navbar-config';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { LanguageService } from 'src/app/core/services/language.service';

import { SocketioService } from './../../services/socketio.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  navbarConfig!: NavbarConfig;
  room!: string;
  username!: string;


  constructor(
    private _dialog: MatDialog,
    private _languageService: LanguageService,
    private _authenticationService: AuthenticationService
  ) { }

  onGetClickedButtonName(event: any): void {
    switch (event.action) {
      case 'translate':
        this._languageService.updateLanguage(event.data);
        break;
      case 'help':
        console.log(event)
        break;
    }
  }

  ngOnInit() {
    this.username = this._authenticationService.getUsername();
    this.room = this._authenticationService.getRoom();

    this.navbarConfig = {
      title: { name: "Multiplayer Game", align: "flexStart" },
      color: "transparent",
      buttons: [
        {
          id: "translate", hasIcon: true, svgIconName: "translate-white", align: "flexEnd", hasMatMenu: true,
          matMenuOptions: { values: this._languageService.getLanguages() }
        },
        { id: "help", hasIcon: true, svgIconName: "help_center-white", align: "flexEnd", hasMatMenu: false }
      ]
    };
  }

}
