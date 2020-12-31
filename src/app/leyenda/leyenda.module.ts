import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatButtonModule } from '@angular/material';
import { LeyendaComponent } from './leyenda.component';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';

import { DragDropModule } from '@angular/cdk/drag-drop'

@NgModule({
    imports: [
      CommonModule,
      MatDialogModule,
      MatFormFieldModule,
      FormsModule,
      MatInputModule,
      MatButtonModule,
      MatDialogModule,
      MatCheckboxModule,
      DragDropModule
      
      
    ],
    declarations: [LeyendaComponent],
    entryComponents: [LeyendaComponent],
    exports: [LeyendaComponent]
  })
  export class LeyendaModule { }