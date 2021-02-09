import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  private _languages: string[];
  private _selectedLanguage: string;
  private _languageNotifier$:BehaviorSubject<boolean>;

  constructor() {
    this._languages = ["BR", "EN", "ES"];
    this._selectedLanguage = "EN";
    this._languageNotifier$ = new BehaviorSubject<boolean>(true);
  }

  getLanguages(): string[] {
    return this._languages;
  }

  getSelectedLanguage(): string {
    return this._selectedLanguage;
  }

  updateLanguage(newLanguage: string): void {
    if (this._languages.find(language => language === newLanguage )) {
      this._selectedLanguage = newLanguage;
      this._languageNotifier$.next(true);
    }
  }

  getLanguageNotifier():Observable<boolean>{
    return this._languageNotifier$;
  }


}
