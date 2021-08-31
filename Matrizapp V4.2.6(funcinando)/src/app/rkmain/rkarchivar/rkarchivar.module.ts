import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatButtonModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { DragDropModule } from '@angular/cdk/drag-drop'
import { RkarchivarComponent } from './rkarchivar.component';
@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    DragDropModule
  ],
  declarations: [RkarchivarComponent],
  entryComponents: [RkarchivarComponent],
  exports: [RkarchivarComponent]
})

export class Rkarchivarmodule { }
