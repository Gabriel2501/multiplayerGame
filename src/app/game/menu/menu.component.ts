import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { AjudaComponent } from './ajuda/ajuda.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  idiomas: any[];

  constructor(public dialog: MatDialog) {
    this.idiomas = ["BR", "EN", "ES"];
  }

  ngOnInit(): void {
  }

  exibirAjuda() {
    this.dialog.open(AjudaComponent, {});
  }

  selecionarIdioma(idioma: string): void {
    // Preparar arquivo de Settings, talvez?
    // A partir daqui teria que alterar o idioma
    console.log(idioma);
  }
}