import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatButtonModule } from '@angular/material';
import { ChecklistComponent } from './checklist.component';
import { FiltroPipe } from '../componentes/filtro.pipe';
import { RkmessagesModule } from '../componentes/rkmain/rkmessages/rkmessages.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FilterModule } from '@josee9988/filter-pipe-ngx';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

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
    FilterModule,
    NgxMatSelectSearchModule,
    MatSlideToggleModule
  ],
  declarations: [ChecklistComponent, FiltroPipe],
  entryComponents: [ChecklistComponent],
  exports: [ChecklistComponent]
})

export class checklistModule { }
