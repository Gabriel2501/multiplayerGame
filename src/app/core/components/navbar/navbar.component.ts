import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Button } from '../../interfaces/button';
import { NavbarConfig } from '../../interfaces/navbar-config';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  @Input() color!: string;
  @Input() buttons!: { [key: string]: any };
  @Input('config') config!: NavbarConfig;
  @Output() clickedButtonName: EventEmitter<{ [key: string]: any }> = new EventEmitter();

  languages!: string[];
  selectedLanguage!: string;
  selectedDictionary!: { [key: string]: any };
  private _languageNotifierSubscription!: Subscription;

  navbarAreas: { [key: string]: string }[] = [
    { cssClass: 'flex__start', align: 'flexStart' }, { cssClass: 'center', align: 'center' }, { cssClass: 'flex__end', align: 'flexEnd' }
  ];
  leftButtons: Button[] = [];
  rightButtons: Button[] = [];
  centerButtons: Button[] = [];

  constructor(
    private _domSanitizer: DomSanitizer,
    private _iconRegistry: MatIconRegistry,
    private _languageService: LanguageService,
  ) {
    this._iconRegistry.addSvgIcon('translate-white', this._domSanitizer.bypassSecurityTrustResourceUrl(`${environment.ICON_PATH}translate-white-24dp.svg`));
    this._iconRegistry.addSvgIcon('help_center-white', this._domSanitizer.bypassSecurityTrustResourceUrl(`${environment.ICON_PATH}help_center-white-24dp.svg`));
  }

  private _setupNavbarButtons() {
    this.config.buttons.map((button: Button) => {
      switch (button.align) {
        case 'flexStart':
          this.leftButtons.push(button);
          break;
        case 'center':
          this.centerButtons.push(button);
          break;
        case 'flexEnd':
          this.rightButtons.push(button);
          break;
      };
    });
  }


  getNavbarColorClass(): string {
    return `navbar-${this.config.color}__color`;
  }

  getNavbarAreaAlignment(value: string): string {
    return `${value}-horizontal-align center-vertical-align ${value}-area`;
  }

  getNavbarTitleAlignment(area: string, TitleAlign: string): boolean {
    return area === TitleAlign ? true : false;
  }

  getNavbarAreaButtons(area: string): Button[] {
    switch (area) {
      case 'flexStart':
        return this.leftButtons;
      case 'center':
        return this.centerButtons;
      case 'flexEnd':
        return this.rightButtons;
      default:
        return [];
    }
  }

  onClick(name: string, data?: any): void {
    this.clickedButtonName.emit({ action: name, data: data });
  }

  ngOnInit(): void {
    this._languageNotifierSubscription = this._languageService.getLanguageNotifier().subscribe(() => {
      this.selectedLanguage = this._languageService.getSelectedLanguage();
    });

    this.languages = this._languageService.getLanguages();
    this._setupNavbarButtons();
  }


  ngOnDestroy(): void {
    this._languageNotifierSubscription.unsubscribe();
  }

}
