import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatButtonModule, MatChipsModule, MatExpansionModule, MatListModule, MatPaginatorModule, MatProgressBarModule, MatTableModule, MatCheckboxModule, MatIconModule } from '@angular/material';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RkycblandoComponent } from './rkycblando.component';
import { MatSelectModule } from '@angular/material/select';
import { FilterModule } from '@josee9988/filter-pipe-ngx';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,     
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    FilterModule,
    NgxMatSelectSearchModule,
    MatTableModule,
    MatPaginatorModule,
    MatExpansionModule,
    MatListModule,
    MatChipsModule,
    MatProgressBarModule,
    MatCheckboxModule,
    MatIconModule

  ],
  declarations: [RkycblandoComponent],
  entryComponents: [RkycblandoComponent],
  exports: [RkycblandoComponent]
})

export class RkycblandoModule { }
