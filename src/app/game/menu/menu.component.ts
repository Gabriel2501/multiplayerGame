import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { AjudaComponent } from './ajuda/ajuda.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  exibirAjuda() {
    this.dialog.open(AjudaComponent, {});
  }
}