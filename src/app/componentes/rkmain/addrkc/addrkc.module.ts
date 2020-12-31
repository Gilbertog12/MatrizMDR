import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatButtonModule } from '@angular/material';
import { AddrkcComponent } from './addrkc.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RkmessagesModule } from '../rkmessages/rkmessages.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FiltroPipe } from './filtro.pipe'
import { FilterModule } from '@josee9988/filter-pipe-ngx';

@NgModule({
  imports: [
    CommonModule,
    MatTreeModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    RkmessagesModule,
    MatDialogModule, 
    MatButtonModule,
    MatInputModule,
    DragDropModule,
    FilterModule
  ],
  declarations: [AddrkcComponent, FiltroPipe],
  entryComponents: [AddrkcComponent],
  exports: [AddrkcComponent]
})

export class AddrkcModule { }
