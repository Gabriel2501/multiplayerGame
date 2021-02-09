import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService{

  private _languages!: string[];
  private _selectedLanguage!: string;
  private _languageNotifier$: BehaviorSubject<boolean>;
  private _languagesDictionary: any;

  constructor() {
    this._languageNotifier$ = new BehaviorSubject<boolean>(true);
    this._languages = ["BR", "EN", "ES"];
    this._selectedLanguage = "EN";

    this._languagesDictionary = {
      "BR": {
        "login": {
          Room: "Sala",
          Username: "Nome de usuario",
          LoginTip: "Digite o nome da sala e seu usuário para continuar",
          LogIn: "Entrar",
          Cancel: "Cancelar"
        }
      },
      "EN": {
        "login": {
          Room: "Room",
          Username: "Username",
          LoginTip: "Enter the room and user name to hop in",
          LogIn: "LogIn",
          Cancel: "Cancel",
        }
      },
      "ES": {
        "login": {
          Room: "Sala",
          Username: "Nombre",
          LoginTip: "Escriba la sala y el nombre de usuario para ingresar",
          LogIn: "Iniciar",
          Cancel: "Cancelar",
        }
      }
    }
  }

  getLanguages(): string[] {
    return this._languages;
  }

  getSelectedLanguage(): string {
    return this._selectedLanguage;
  }

  updateLanguage(newLanguage: string): void {
    if (this._languages.find(language => language === newLanguage)) {
      this._selectedLanguage = newLanguage;
      this._languageNotifier$.next(true);
    }
  }

  getDictionary(componentName: string): {} {
    return this._languagesDictionary[this._selectedLanguage][componentName];
  }

  getLanguageNotifier(): Observable<boolean> {
    return this._languageNotifier$;
  }

}