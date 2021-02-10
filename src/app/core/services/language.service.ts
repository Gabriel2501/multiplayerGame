import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { languagesDictionary } from "src/assets/languages/languageBarrel"

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  private _languages!: string[];
  private _selectedLanguage!: string;
  private _languageNotifier$: BehaviorSubject<boolean>;
  private _languagesDictionary: any;

  constructor() {
    this._languageNotifier$ = new BehaviorSubject<boolean>(true);
    this._languages = ["BR", "EN", "ES"];
    this._selectedLanguage = "EN";

    this._languagesDictionary = languagesDictionary;
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