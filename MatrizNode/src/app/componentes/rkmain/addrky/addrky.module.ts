import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatButtonModule } from '@angular/material';
import { AddrkyComponent } from './addrky.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RkmessagesModule } from '../rkmessages/rkmessages.module';
import { AddrkyprobabilidadModule } from '../addrkyprobabilidad/addrkyprobabilidad.module';
import { AddrkyseveridadModule } from '../addrkyseveridad/addrkyseveridad.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FiltroPipe } from './filtro.pipe';
import { FilterModule } from '@josee9988/filter-pipe-ngx';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

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
    AddrkyprobabilidadModule,
    AddrkyseveridadModule,
    DragDropModule,
    FilterModule,
    NgxMatSelectSearchModule
  ],
  declarations: [AddrkyComponent, FiltroPipe],
  entryComponents: [AddrkyComponent],
  exports: [AddrkyComponent]
})

export class AddrkyModule { }