import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatButtonModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { DragDropModule } from '@angular/cdk/drag-drop'

import { RktareastdComponent } from './rktareastd.component';


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
  declarations: [RktareastdComponent],
  entryComponents: [RktareastdComponent],
  exports: [RktareastdComponent]
})

export class RktareastdModule { }