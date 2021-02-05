import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { LanguageService } from 'src/app/core/services/language.service';

import { AjudaComponent } from './ajuda/ajuda.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy {

  languages!: string[];
  selectedLanguage!: string;
  languageNotifierSubscription!: Subscription;

  constructor(public dialog: MatDialog, public languageService: LanguageService) {
  }

  ngOnInit(): void {
    this.languageNotifierSubscription = this.languageService.getLanguageNotifier().subscribe(()=>{
      this.selectedLanguage = this.languageService.getSelectedLanguage();
    });
    this.languages = this.languageService.getLanguages();
  }

  ngOnDestroy():void{
    this.languageNotifierSubscription.unsubscribe();
  }

  exibirAjuda() {
    this.dialog.open(AjudaComponent, {});
  }

  selectLanguage(newLanguage: string): void {
    this.languageService.updateLanguage(newLanguage);
  }
}
