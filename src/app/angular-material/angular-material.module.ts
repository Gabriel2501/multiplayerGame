import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
<<<<<<< HEAD
import { MatRippleModule } from '@angular/material/core';
=======
import {MatDividerModule} from '@angular/material/divider';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
>>>>>>> 0a1023ea6458038b3aebdf1fa5d8db1879e940d4

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
<<<<<<< HEAD
    MatRippleModule,
=======
    MatMenuModule
>>>>>>> 0a1023ea6458038b3aebdf1fa5d8db1879e940d4
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
<<<<<<< HEAD
    MatRippleModule,
=======
    MatListModule,
    MatMenuModule
>>>>>>> 0a1023ea6458038b3aebdf1fa5d8db1879e940d4
  ]
})
export class AngularMaterialModule { }
