import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  @Input() color!: string;
  @Input() buttons!: { [key: string]: any };

  languages!: string[];
  selectedLanguage!: string;
  _languageNotifierSubscription!: Subscription;
  selectedDictionary!: { [key: string]: any };

  constructor(
    private _domSanitizer: DomSanitizer,
    private _iconRegistry: MatIconRegistry,
    private _languageService: LanguageService,
  ) {
    this._iconRegistry.addSvgIcon('translate-white', this._domSanitizer.bypassSecurityTrustResourceUrl(`${environment.ICON_PATH}translate-white-24dp.svg`));
  }

  private _sanitizeElements(type: string, element: any[]): void {
    // check if obj (key: elementRef) is trusted
  }

  getNavbarColorClass(): string {
    return `navbar-${this.color}__color`;
  }

  onSelectLanguage(language: string): void {
    this._languageService.updateLanguage(language)
  }

  ngOnInit(): void {
    this._languageNotifierSubscription = this._languageService.getLanguageNotifier().subscribe(() => {
      this.selectedLanguage = this._languageService.getSelectedLanguage();
      // this.selectedDictionary = this._languageService.getDictionary("login");
    });
    this.languages = this._languageService.getLanguages();
  }

  ngOnDestroy(): void {
    this._languageNotifierSubscription.unsubscribe();
  }

}
