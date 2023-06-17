import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatButtonModule } from '@angular/material';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FilterModule } from '@josee9988/filter-pipe-ngx';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { CambioPosicionComponent } from '../../../cambio-posicion/cambio-posicion.component';



@NgModule({
  imports: [
    CommonModule,
    MatTreeModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDialogModule, 
    MatButtonModule,
    MatInputModule,
    DragDropModule,
    FilterModule,
    NgxMatSelectSearchModule
  ],
  declarations: [CambioPosicionComponent],
  entryComponents: [CambioPosicionComponent],
  exports: [CambioPosicionComponent]
})

export class posicionModule { }
