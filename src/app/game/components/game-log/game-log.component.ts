import { Component, OnDestroy, OnInit } from '@angular/core';

// import { Observable, Subscription } from 'rxjs';
// import { LanguageService } from 'src/app/core/services/language.service';
// import { SocketioService } from './../../services/socketio.service';

@Component({
  selector: 'app-game-log',
  templateUrl: './game-log.component.html',
  styleUrls: ['./game-log.component.scss']
})
export class GameLogComponent implements OnInit, OnDestroy {

  // log$!: Observable<any>;
  // logObjectList: {}[];
  // logList: any[];
  // adminView$!: Observable<boolean>;
  // isAdmin!: boolean;

  // private _languageNotifierSubscription!: Subscription;
  // selectedDictionary!: { [key: string]: any };

  constructor(
    // private _socketioService: SocketioService,
    // private _languageService: LanguageService
  ) {
    // this.isAdmin = false;
    // this.logList = [];
    // this.logObjectList = [];
  }

  ngOnInit(): void {
    // this._languageNotifierSubscription = this._languageService.getLanguageNotifier().subscribe(() => {
    //   this.selectedDictionary = this._languageService.getDictionary("game-log");
    //   this.updateLogList();
    // });

    // this.log$ = this._socketioService.getLog();
    // this.log$.subscribe(data => {
    //   this.logObjectList = [];
    //   data.forEach((value: any) => {
    //     this.logObjectList.push({ username: value.username, logKey: value.logKey });
    //   });
    //   this.updateLogList();
    // });

    // this.adminView$ = this._socketioService.isAdmin();
    // this.adminView$.subscribe((value) => this.isAdmin = value);
  }

  ngOnDestroy() {
    // this._languageNotifierSubscription.unsubscribe();
  }

  // startGame(): void {
  //   //Passa um objeto vazio para que o emitEvent inclua os parâmetros obrigatórios (sala e usuário emissor do evento)
  //   this._socketioService.emitEvent("start_game", {});
  // }

  // sair(): void {
  //   this._socketioService.emitEvent('user_logout', {});
  // }

  // updateLogList() {
  //   this.logList = [];
  //   this.logObjectList?.forEach((value: any) => {
  //     this.logList.push(value?.username + this.selectedDictionary[value?.logKey]);
  //   });
  // }

}
