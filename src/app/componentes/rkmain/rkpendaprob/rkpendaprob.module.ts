import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatButtonModule } from '@angular/material';
import { RkpendaprobComponent } from './rkpendaprob.component';

import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { Rkarchivarmodule } from '../../../rkmain/rkarchivar/rkarchivar.module';
import { FiltroPipe } from '../../filtro.pipe';






@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    DragDropModule,
    Rkarchivarmodule
  ],
  declarations: [RkpendaprobComponent,FiltroPipe],
  entryComponents: [RkpendaprobComponent],
  exports: [RkpendaprobComponent]
})

export class RkpendaprobModule { }