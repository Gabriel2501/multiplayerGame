import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatRippleModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatDividerModule,
    MatGridListModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatListModule,
    MatRippleModule,
    MatMenuModule
  ],
  exports: [
    MatDividerModule,
    MatGridListModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatListModule,
    MatRippleModule,
    MatMenuModule
  ]
})
export class AngularMaterialModule { }
