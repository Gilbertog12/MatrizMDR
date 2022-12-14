import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { CdkTableModule } from '@angular/cdk/table';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatIconModule, MatSelectModule, MatTreeModule } from '@angular/material';
import { EntidadesPendientesComponent } from './entidades-pendientes.component';

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
  ],

  declarations: [EntidadesPendientesComponent],
    entryComponents: [EntidadesPendientesComponent],
    exports: [EntidadesPendientesComponent],
    
  })
export class EntidadesPendientesModule { }
