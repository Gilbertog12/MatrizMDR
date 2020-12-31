import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatButtonModule, MatCheckboxModule } from '@angular/material';
import { RkcstdjobComponent } from './rkcstdjob.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FilterModule } from '@josee9988/filter-pipe-ngx';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatTreeModule } from '@angular/material/tree';
import { RkstdtareasModule } from '../rkstdtareas/rkstdtareas.module';





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
    RkstdtareasModule,
    MatCheckboxModule

    
  ],
  declarations: [RkcstdjobComponent],
  entryComponents: [RkcstdjobComponent],
  exports: [RkcstdjobComponent]
})

export class RkcstdjobModule { }
